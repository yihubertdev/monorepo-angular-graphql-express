"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStorageBaseModel = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const storage_1 = require("@angular/fire/storage");
let FireStorageBaseModel = class FireStorageBaseModel {
    /**
     * Constructor
     *
     * @param {Storage}storage storage
     */
    constructor(storage) {
        this.storage = storage;
        /**
         * uploadPercent
         *
         * @protected
         */
        this.uploadPercent$ = null;
        /**
         * Upload file into fire storage bucket
         *
         * @public
         * @param {File} file upload file
         * @param {string} id upload file id
         * @returns {Promise<string>} return upload file url
         */
        this.upload = async (file, id) => {
            const extension = file.name.split(".").pop();
            const storageRef = (0, storage_1.ref)(this.storage, this.path + "/" + this.category + "-" + id + "." + extension);
            const task = (0, storage_1.uploadBytesResumable)(storageRef, file);
            this.uploadPercent$ = (0, storage_1.percentage)(task);
            await task;
            const url = await (0, storage_1.getDownloadURL)(storageRef);
            return url;
        };
        /**
         * Upload file into fire storage bucket
         *
         * @public
         * @param {File} file upload file
         * @param {string} id upload file id
         * @param {string} path upload file path
         * @param {string} category upload file category
         * @returns {Promise<string>} return upload task
         */
        this.uploadWithPath = async (file, id, path, category) => {
            // Upload file extension
            const extension = file.name.split(".").pop();
            // Create fire storage ref
            this.storageRef = (0, storage_1.ref)(this.storage, path + "/" + category + "-" + id + "." + extension);
            // Upload file
            const task = (0, storage_1.uploadBytesResumable)(this.storageRef, file);
            // Add observer to upload percentage
            this.uploadPercent$ = (0, storage_1.percentage)(task);
            return task;
        };
        /**
         * Get Download URl
         *
         * @public
         */
        this.getDownloadURL = async () => {
            if (!this.storageRef)
                return null;
            return await (0, storage_1.getDownloadURL)(this.storageRef);
        };
        /**
         * Delete file
         *
         * @public
         */
        this.deleteFile = async () => {
            if (!this.storageRef)
                return;
            await (0, storage_1.deleteObject)(this.storageRef);
        };
        /**
         * Delete file by url
         *
         * @param {string}url delete file by url
         * @public
         */
        this.deleteFileByUrl = async (url) => {
            if (!this.storageRef)
                return;
            await (0, storage_1.deleteObject)(this.storageRef);
        };
    }
};
FireStorageBaseModel = tslib_1.__decorate([
    (0, core_1.Injectable)()
], FireStorageBaseModel);
exports.FireStorageBaseModel = FireStorageBaseModel;
//# sourceMappingURL=basic.bucket.js.map