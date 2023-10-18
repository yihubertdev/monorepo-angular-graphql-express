"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFileStorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const basic_bucket_1 = require("./basic.bucket");
let FormFileStorageService = class FormFileStorageService extends basic_bucket_1.FireStorageBaseModel {
    /**
     * Contructor
     *
     * @protected
     * @param {Storage} storage firestore storage
     */
    constructor(storage) {
        super(storage);
        /**
         * Form document path
         *
         * @protected
         */
        this.path = "form";
        /**
         * Form document category
         *
         * @protected
         */
        this.category = "form";
    }
};
FormFileStorageService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], FormFileStorageService);
exports.FormFileStorageService = FormFileStorageService;
//# sourceMappingURL=form-file.bucket.js.map