"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const environment_1 = require("src/environments/environment");
const app_1 = require("@angular/fire/app");
const compat_1 = require("@angular/fire/compat");
const firestore_module_1 = require("./fireStore/firestore.module");
const fire_storage_module_1 = require("./fireStorage/fire-storage.module");
const auth_module_1 = require("./fireAuth/auth.module");
let ServiceModule = class ServiceModule {
};
ServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [
            (0, app_1.provideFirebaseApp)(() => (0, app_1.initializeApp)(environment_1.environment.firebaseConfig)),
            auth_module_1.FireAuthServiceModule,
            firestore_module_1.FireStoreServiceModule,
            fire_storage_module_1.FireStorageServiceModule,
        ],
        providers: [
            { provide: compat_1.FIREBASE_OPTIONS, useValue: environment_1.environment.firebaseConfig },
        ],
        bootstrap: [],
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=services.module.js.map