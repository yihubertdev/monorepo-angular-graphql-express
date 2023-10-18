"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStorageServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const storage_1 = require("@angular/fire/storage");
const auth_module_1 = require("../fireAuth/auth.module");
const firestore_module_1 = require("../fireStore/firestore.module");
const form_file_bucket_1 = require("./form-file.bucket");
const profile_bucket_1 = require("./profile.bucket");
let FireStorageServiceModule = class FireStorageServiceModule {
};
FireStorageServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [
            (0, storage_1.provideStorage)(() => (0, storage_1.getStorage)()),
            firestore_module_1.FireStoreServiceModule,
            auth_module_1.FireAuthServiceModule,
        ],
        providers: [profile_bucket_1.ProfileStorageService, form_file_bucket_1.FormFileStorageService],
        bootstrap: [],
    })
], FireStorageServiceModule);
exports.FireStorageServiceModule = FireStorageServiceModule;
//# sourceMappingURL=fire-storage.module.js.map