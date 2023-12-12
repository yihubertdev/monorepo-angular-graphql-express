import { UserService } from "../fireStore/users.firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  sendEmailVerification,
  ActionCodeSettings,
  Auth,
  UserCredential,
  signInWithPopup,
  user,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithPhoneNumber,
  multiFactor,
} from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { IUser, IUserRegister, IUserRole } from "sources-types";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
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
  // private _resendEmailCall$: Subject<User> = new Subject<User>();

  constructor(
    private auth: Auth,
    private userService: UserService,
    private _sessionStorage: SessionStorageService
  ) {
    this._userAuth = new BehaviorSubject<User | null>(this.auth.currentUser);
    this.userAuthObserver$ = this._userAuth.asObservable();
    this.auth.setPersistence(browserSessionPersistence);
    // this.auth.onAuthStateChanged(async (user) => {
    //   this._userAuth.next(user);
    //   let sessionUser = this._sessionStorage.getSessionStorage<IUser>("user");
    //   if (!user && !sessionUser) {
    //     return this._sessionStorage.deleteSessionStorage("user");
    //   }

    //   if (user && !sessionUser) {
    //     sessionUser = await this.userService.listUserByUserIdWithUId(user.uid);
    //     return this._sessionStorage.setSessionStorage("user", sessionUser);
    //   }
    // });
    // this.resendEmail().subscribe((value) => console.log(value));
  }

  // public resendEmail(): Observable<any> {
  //   return this._resendEmailCall$.pipe(
  //     throttleTime(1000), // Adjust the throttle time as needed
  //     switchMap(() => {
  //       return "hello";
  //     })
  //   );
  // }

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

  /**
   * Login firebase auth
   *
   * @public
   * @param {{ email: string; password: string }} data data login
   * @param {string} data.email email address
   * @param {string} data.password password address
   * @returns {Promise<void>} user credential
   */
  public async login(data: { email: string; password: string }): Promise<void> {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );

    const userFull = await this.userService.listUserByUserIdWithUId(user.uid);
    this._sessionStorage.setSessionStorage("user", userFull);
  }

  /**
   * Register user to firebase auth
   *
   * @public
   * @param {IUserRegister} data user register data
   * @returns {Promise<IUserRegister>} user register
   */
  public async register({
    email,
    password,
    displayName,
  }: IUserRegister): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await Promise.all([
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
        uid: user.uid,
      }),
      this.sendVerificationMail(user),
    ]);

    const userFull = await this.userService.retrieveByUId(user.uid);
    this._sessionStorage.setSessionStorage("user", userFull);
  }

  async signInWithPhone(recaptchaVerifier: RecaptchaVerifier) {
    const confirmationResult = await signInWithPhoneNumber(
      this.auth,
      "+1 650-555-1234",
      recaptchaVerifier
    );

    await confirmationResult.confirm("123456");
  }

  /**
   * Sign in anonymously
   *
   * @public
   * @returns {Promise<UserCredential>} anonymous auth
   */
  public async anonymousSignIn(): Promise<UserCredential> {
    return await signInAnonymously(this.auth);
  }

  /**
   * Get current user auth
   *
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
    if (!userAuth) return false;
    return Boolean(userAuth.emailVerified);
  }

  /**
   * Sign out user from firebase auth
   *
   * @public
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    this.auth.signOut();
    this._sessionStorage.deleteSessionStorage("user");
  }

  /**
   * Retrieve all documents from collection
   *
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
   *
   * @public
   * @param {IUserRole} role user
   * @returns {boolean} user role is visitor or not
   */
  public isVisitor(role: IUserRole): boolean {
    return [IUserRole.VISITOR].includes(role);
  }

  /**
   * Check user role is admin
   *
   * @public
   * @param {IUserRole} role user role
   * @returns {boolean} user role is admin or not
   */
  public isAdmin(role: IUserRole): boolean {
    return [IUserRole.ADMIN].includes(role);
  }

  /**
   * Check user role is editor
   *
   * @public
   * @param {IUserRole} role user
   * @returns {boolean} user role is admin or not
   */
  public isEditor(role: IUserRole): boolean {
    return [IUserRole.EDITOR].includes(role);
  }
}
