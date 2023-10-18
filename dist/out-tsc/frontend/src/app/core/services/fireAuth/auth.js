"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const auth_1 = require("@angular/fire/auth");
const core_1 = require("@angular/core");
const users_type_1 = require("../../models/users.type");
const auth_2 = require("firebase/auth");
const rxjs_1 = require("rxjs");
const auth_3 = require("firebase/auth");
let AuthService = class AuthService {
    constructor(auth, userService, sessionStorage) {
        this.auth = auth;
        this.userService = userService;
        this.sessionStorage = sessionStorage;
        this._userAuth = new rxjs_1.BehaviorSubject(null);
        this.userAuthObserver$ = this._userAuth.asObservable();
        this.auth.setPersistence(auth_2.browserSessionPersistence);
        this.auth.onAuthStateChanged(async (user) => {
            this._userAuth.next(null);
            if (user) {
                const currentUser = await this.userService.retrieveById(user.uid);
                this._userAuth.next(currentUser);
            }
            else {
                this._userAuth.next({
                    id: "",
                    userId: "",
                    username: null,
                    email: null,
                    emailVerified: false,
                    isAnonymous: false,
                    phoneNumber: null,
                    photoURL: null,
                    role: users_type_1.IUserRole.VISITOR,
                });
            }
        });
        this.googleProvider = new auth_2.GoogleAuthProvider();
        this.twitterProvider = new auth_3.TwitterAuthProvider();
    }
    /**
     * Update user information
     *
     * @public
     * @param {User} user user information
     * @param {Partial<Pick<IUserProfile, "displayName" | "photoURL">>} data updated information data
     * @returns {Promise<boolean>} update status
     */
    async updateUserInfo(user, data) {
        try {
            console.log(data);
            await (0, auth_2.updateProfile)(user, data);
            return true;
        }
        catch (err) {
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
    async googleAuthSignIn() {
        return await (0, auth_1.signInWithPopup)(this.auth, this.googleProvider);
    }
    /**
     * Sign in with twitter OAuth
     *
     * @public
     * @returns {Promise<UserCredential>} twitter auth
     */
    async twitterAuthSignIn() {
        return await (0, auth_1.signInWithPopup)(this.auth, this.twitterProvider);
    }
    /**
     * Sign in anonymously
     *
     * @public
     * @returns {Promise<UserCredential>} anonymous auth
     */
    async anonymousSignIn() {
        return await (0, auth_2.signInAnonymously)(this.auth);
    }
    /**
     * Get current user information
     *
     * @public
     * @returns {User | null} get user information
     */
    get() {
        return this.auth.currentUser;
    }
    /**
     * Get current user information
     *
     * @public
     * @returns {IUserAuth | undefined} user auth
     */
    getJSON() {
        return this.auth.currentUser?.toJSON();
    }
    /**
     * Register user to firebase auth
     *
     * @public
     * @param {IUserRegister} data user register data
     * @returns {Promise<IUserRegister>} user register
     */
    async register(data) {
        // Create user with firebase auth
        const result = await (0, auth_1.createUserWithEmailAndPassword)(this.auth, data.email, data.password);
        // Get User
        const user = result.user;
        console.log(user);
        // Send verification mail
        this.sendVerificationMail(user);
        // Save User info into firestore
        this.userService.create({
            id: user.uid,
            userId: user.uid,
            username: data.username,
            role: users_type_1.IUserRole.VISITOR,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
        });
        return result;
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
    async login(data) {
        return (0, auth_1.signInWithEmailAndPassword)(this.auth, data.email, data.password);
    }
    /**
     * Sign out user from firebase auth
     *
     * @public
     * @returns {Promise<void>}
     */
    async logout() {
        await this.auth.signOut();
    }
    /**
     * Retrieve all documents from collection
     *
     * @private
     * @param {User} user user
     * @returns {Promise<void>}
     */
    async sendVerificationMail(user) {
        const actionCodeSettings = {
            url: "http://localhost:4200/",
            handleCodeInApp: true,
        };
        const result = await (0, auth_1.sendEmailVerification)(user, actionCodeSettings);
    }
    /**
     * Check user role is visitor
     *
     * @public
     * @param {IUserRole} role user
     * @returns {boolean} user role is visitor or not
     */
    isVisitor(role) {
        return [users_type_1.IUserRole.VISITOR].includes(role);
    }
    /**
     * Check user role is admin
     *
     * @public
     * @param {IUserRole} role user role
     * @returns {boolean} user role is admin or not
     */
    isAdmin(role) {
        return [users_type_1.IUserRole.ADMIN].includes(role);
    }
    /**
     * Check user role is editor
     *
     * @public
     * @param {IUserRole} role user
     * @returns {boolean} user role is admin or not
     */
    isEditor(role) {
        return [users_type_1.IUserRole.EDITOR].includes(role);
    }
};
AuthService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.js.map