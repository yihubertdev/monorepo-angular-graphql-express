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
} from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { IUser, IUserRegister, IUserRole } from "sources-types";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";
import { SessionStorageService } from "../browserStorage/sessionStorage";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _userAuth: BehaviorSubject<User | null>;
  public readonly userAuthObserver$: Observable<User | null>;
  public currentUser?: IUser;
  private googleProvider: GoogleAuthProvider;
  private twitterProvider: TwitterAuthProvider;

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
      this.currentUser = this._sessionStorage.getSessionStorage<IUser>("user");
      if (user && !this.currentUser) {
        this.currentUser = await this.userService.listUserWithCache(user.uid);
        this._sessionStorage.setSessionStorage("user", this.currentUser);
      } else if (!user && !this.currentUser) {
        this._sessionStorage.deleteSessionStorage("user");
      }
    });

    this.googleProvider = new GoogleAuthProvider();
    this.twitterProvider = new TwitterAuthProvider();
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
      id: this.currentUser!.id,
      ...data,
    });
  }

  /**
   * Sign in with google OAuth
   *
   * @public
   * @returns {Promise<UserCredential>} google auth
   */
  public async googleAuthSignIn(): Promise<UserCredential> {
    return await signInWithPopup(this.auth, this.googleProvider);
  }

  /**
   * Sign in with twitter OAuth
   *
   * @public
   * @returns {Promise<UserCredential>} twitter auth
   */
  public async twitterAuthSignIn(): Promise<UserCredential> {
    return await signInWithPopup(this.auth, this.twitterProvider);
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
   * Get current user information
   *
   * @public
   * @returns {IUser | undefined} get user information
   */
  public get(): IUser | undefined {
    return this.currentUser;
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

  /**
   * Register user to firebase auth
   *
   * @public
   * @param {IUserRegister} data user register data
   * @returns {Promise<IUserRegister>} user register
   */
  public async register(data: IUserRegister): Promise<IUser> {
    // Create user with firebase auth
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );

    await Promise.all([
      this.sendVerificationMail(user),
      this.userService.create({
        id: user.uid,
        userId: this.userService.generateUserId(data.displayName),
        displayName: data.displayName,
        role: IUserRole.VISITOR,
        photoURL: null,
        backgroundPhotoURL: null,
        description: null,
      }),
    ]);
    [this.currentUser] = await this.userService.retrieveById([user.uid]);
    return this.currentUser;
  }

  /**
   * Login firebase auth
   *
   * @public
   * @param {{ email: string; password: string }} data data login
   * @param {string} data.email email address
   * @param {string} data.password password address
   * @returns {void} user credential
   */
  public async login(data: { email: string; password: string }): Promise<void> {
    await signInWithEmailAndPassword(this.auth, data.email, data.password);
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
  private async sendVerificationMail(user: User): Promise<void> {
    const actionCodeSettings: ActionCodeSettings = {
      url: "http://localhost:4200/",
      handleCodeInApp: true,
    };

    const result = await sendEmailVerification(user, actionCodeSettings);
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
