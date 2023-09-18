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
import { IUser, IUserProfile, IUserRegister, IUserRole } from "sources-types";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { TwitterAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  private _userAuth: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public readonly userAuthObserver$: Observable<IUser | null> =
    this._userAuth.asObservable();
  public currentUser: IUser | null = null;

  private googleProvider: GoogleAuthProvider;
  private twitterProvider: TwitterAuthProvider;

  constructor(private auth: Auth, private userService: UserService) {
    this.auth.setPersistence(browserSessionPersistence);
    this.auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        this.currentUser = await this.userService.retrieveById(user.uid);
        this._userAuth.next(this.currentUser);
      }
    });

    this.googleProvider = new GoogleAuthProvider();
    this.twitterProvider = new TwitterAuthProvider();
  }

  /**
   * Update user information
   *
   * @public
   * @param {User} user user information
   * @param {Partial<Pick<IUserProfile, "displayName" | "photoURL">>} data updated information data
   * @returns {Promise<boolean>} update status
   */
  public async updateUserInfo(
    user: User,
    data: Partial<Pick<IUserProfile, "displayName" | "photoURL">>
  ): Promise<boolean> {
    try {
      console.log(data);
      await updateProfile(user, data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
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
   * @returns {IUser | null} get user information
   */
  public get(): IUser | null {
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
  public async register(data: IUserRegister): Promise<User> {
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
        userId: user.uid,
        username:
          data.displayName.replace(/\s/g, "").toLowerCase() +
          "-" +
          uuidv4().substring(0, 5),
        displayName: data.displayName,
        role: IUserRole.VISITOR,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      }),
    ]);

    const currentUser = await this.userService.retrieveById(user.uid);
    this._userAuth.next(currentUser);
    return user;
  }

  /**
   * Login firebase auth
   *
   * @public
   * @param {{ email: string; password: string }} data data login
   * @param {string} data.email email address
   * @param {string} data.password password address
   * @returns {Promise<UserCredential>} user credential
   */
  public async login(data: {
    email: string;
    password: string;
  }): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, data.email, data.password);
  }

  /**
   * Sign out user from firebase auth
   *
   * @public
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    await this.auth.signOut();
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
