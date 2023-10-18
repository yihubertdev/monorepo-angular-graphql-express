"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileStorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const storage_1 = require("@angular/fire/storage");
const basic_bucket_1 = require("./basic.bucket");
let ProfileStorageService = class ProfileStorageService extends basic_bucket_1.FireStorageBaseModel {
    /**
     * Contructor
     *
     * @protected
     * @param {Storage} storage
     */
    constructor(storage, userService, authService) {
        super(storage);
        this.userService = userService;
        this.authService = authService;
        /**
         * Profile image path
         *
         * @protected
         */
        this.path = "profiles";
        /**
         * Profile image category
         *
         * @protected
         */
        this.category = "profile";
        /**
         * Upload file into fire storage bucket
         *
         * @public
         * @param {File} file
         * @param {string} id
         * @returns {Promise<string>}
         */
        this.upload = async (file, id) => {
            // Upload file extension
            const extension = file.name.split(".").pop();
            // Create fire storage ref
            const storageRef = (0, storage_1.ref)(this.storage, this.path + "/" + this.category + "-" + id + "." + extension);
            // Upload file
            const task = (0, storage_1.uploadBytesResumable)(storageRef, file);
            // Add observer to upload percentage
            this.uploadPercent$ = (0, storage_1.percentage)(task);
            await task;
            // Get the file url
            const url = await (0, storage_1.getDownloadURL)(storageRef);
            // Save user profile on firebase auth
            const user = this.authService.get();
            // If user is not sign in, throw error
            if (!user) {
                throw Error("User is not signed in");
            }
            // Update fire auth user information
            await this.authService.updateUserInfo(user, {
                photoURL: url,
            });
            // Get user profile in firestore
            await this.userService.retrieveById(id);
            // Update user profile in firestore
            this.userService.update({ photoURL: url, id });
            return url;
        };
    }
};
ProfileStorageService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], ProfileStorageService);
exports.ProfileStorageService = ProfileStorageService;
//# sourceMappingURL=profile.bucket.js.map