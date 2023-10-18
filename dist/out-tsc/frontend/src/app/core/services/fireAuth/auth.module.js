"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireAuthServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const auth_1 = require("@angular/fire/auth");
const browserStorage_module_1 = require("../browserStorage/browserStorage.module");
const auth_2 = require("./auth");
let FireAuthServiceModule = class FireAuthServiceModule {
};
FireAuthServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [(0, auth_1.provideAuth)(() => (0, auth_1.getAuth)()), browserStorage_module_1.BrowserStorageServiceModule],
        providers: [auth_2.AuthService],
        bootstrap: [],
    })
], FireAuthServiceModule);
exports.FireAuthServiceModule = FireAuthServiceModule;
//# sourceMappingURL=auth.module.js.map