import { UserService } from "../fireStore/users.firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  sendEmailVerification,
  ActionCodeSettings,
  Auth,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  ConfirmationResult,
} from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { IUserRegister, IUserRole } from "sources-types";
import { browserSessionPersistence, updateProfile } from "firebase/auth";
import { SessionStorageService } from "../browserStorage/sessionStorage";
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  throttleTime,
} from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _userAuth: BehaviorSubject<User | null>;
  public readonly userAuthObserver$: Observable<User | null>;
  private _resendEmailCall$: Subject<User> = new Subject<User>();

  constructor(
    private auth: Auth,
    private userService: UserService,
    private _sessionStorage: SessionStorageService
  ) {
    this._userAuth = new BehaviorSubject<User | null>(this.auth.currentUser);
    this.userAuthObserver$ = this._userAuth.asObservable();

    this.auth.setPersistence(browserSessionPersistence);
    this.auth.onAuthStateChanged(async (user) => {
      this._userAuth.next(user);
    });
  }

  public resendEmail(): Observable<any> {
    return this._resendEmailCall$.pipe(
      throttleTime(60000), // email call has to be 1 mins each
      switchMap((user) => this.sendVerificationMail(user))
    );
  }

  public triggerResendEmail(user: User) {
    this._resendEmailCall$.next(user);
  }

  public updateUserInfo(data: {
    displayName?: string;
    photoURL?: string;
  }): void {
    if (!this.auth.currentUser) {
      throw Error("User not login");
    }
    updateProfile(this.auth.currentUser, data);
    this.userService.update({
      document: data,
      uid: this.auth.currentUser.uid,
    });
  }

  public getFireAuth() {
    return this.auth;
  }

  public buildRecaptcha(recaptcha: string) {
    return new RecaptchaVerifier(
      this.auth,
      recaptcha,
      // Optional reCAPTCHA parameters.
      {
        size: "normal",
      }
    );
  }

  /**
   * Login firebase auth
   * @public
   * @param {{ email: string; password: string }} data data login
   * @param {string} data.email email address
   * @param {string} data.password password address
   * @returns {Promise<User>} user credential
   */
  public async login(data: {
    email: string;
    password: string;
  }): Promise<User | undefined> {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );

    if (!this.isUserVerified(user)) {
      return user;
    }

    const userFull = await this.userService.retrieveByUId(user.uid);
    this._sessionStorage.setSessionStorage("user", userFull);
    this._userAuth.next(user);
    return;
  }

  /**
   * Register user to firebase auth
   * @public
   * @param {IUserRegister} data user register data
   * @param {RecaptchaVerifier} verifier user register data
   * @returns {Promise<User>} user register
   */
  public async register(
    { email, password, displayName, phone }: IUserRegister,
    verifier: RecaptchaVerifier
  ): Promise<any> {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const [confirmationResult] = await Promise.all([
      this.linkWithPhone(user, phone, verifier),
      updateProfile(user, { displayName }),
      this.userService.create({
        document: {
          userId: this.generateUserId(displayName, user.uid),
          displayName: displayName,
          role: IUserRole.VISITOR,
          photoURL: null,
          backgroundPhotoURL: null,
          description: null,
        },
        id: user.uid,
      }),
      this.sendVerificationMail(user),
    ]);

    return { user, confirmationResult };
  }

  async linkWithPhone(
    user: User,
    phoneNumber: string,
    verifier: RecaptchaVerifier
  ): Promise<ConfirmationResult> {
    return await linkWithPhoneNumber(user, phoneNumber, verifier);
  }

  async confirmPhone(
    verifyCode: string,
    phoneConfirm: ConfirmationResult
  ): Promise<string | null> {
    // phone confirm will refreash auth, no need to log out and log in again
    const { user } = await phoneConfirm.confirm(verifyCode);

    if (this.isUserVerified(user)) {
      const userFull = await this.userService.retrieveByUId(user.uid);
      this._sessionStorage.setSessionStorage("user", userFull);
      this._userAuth.next(user);
    }
    return user.phoneNumber;
  }

  /**
   * Get current user auth
   * @public
   * @returns {User | null} get user auth
   */
  public getAuth(): User | null {
    return this.auth.currentUser;
  }

  public generateUserId(name: string, uid: string): string {
    return name.replace(/\s/g, "").toLowerCase() + "-" + uid.substring(0, 5);
  }

  public isUserVerified(userAuth: User | null) {
    if (!userAuth || !userAuth.emailVerified || !userAuth.phoneNumber) return;

    return userAuth;
  }

  /**
   * Sign out user from firebase auth
   * @public
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    this.auth.signOut();
    const fireauth = this._sessionStorage.getAllSessionStorage().key(0);

    if (fireauth && fireauth?.includes("firebase")) {
      this._sessionStorage.deleteSessionStorage(fireauth);
    }

    this._sessionStorage.deleteSessionStorage("user");
  }

  /**
   * Retrieve all documents from collection
   * @private
   * @param {User} user user
   * @returns {Promise<void>}
   */
  public async sendVerificationMail(user: User): Promise<void> {
    const actionCodeSettings: ActionCodeSettings = {
      url: "https://hubert-blog.web.app/",
    };

    await sendEmailVerification(user, actionCodeSettings);
  }

  /**
   * Check user role is visitor
   * @public
   * @param {IUserRole} role user
   * @returns {boolean} user role is visitor or not
   */
  public isVisitor(role: IUserRole): boolean {
    return [IUserRole.VISITOR].includes(role);
  }

  /**
   * Check user role is admin
   * @public
   * @param {IUserRole} role user role
   * @returns {boolean} user role is admin or not
   */
  public isAdmin(role: IUserRole): boolean {
    return [IUserRole.ADMIN].includes(role);
  }

  /**
   * Check user role is editor
   * @public
   * @param {IUserRole} role user
   * @returns {boolean} user role is admin or not
   */
  public isEditor(role: IUserRole): boolean {
    return [IUserRole.EDITOR].includes(role);
  }
}
