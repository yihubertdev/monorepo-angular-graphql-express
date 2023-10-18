"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const snack_bar_1 = require("@angular/material/snack-bar");
const browserStorage_module_1 = require("../browserStorage/browserStorage.module");
const login_guard_1 = require("./login.guard");
const user_guard_1 = require("./user.guard");
let GuardServiceModule = class GuardServiceModule {
};
GuardServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [browserStorage_module_1.BrowserStorageServiceModule, snack_bar_1.MatSnackBarModule],
        providers: [user_guard_1.UserGuardService, login_guard_1.LoginGuardService],
        bootstrap: [],
    })
], GuardServiceModule);
exports.GuardServiceModule = GuardServiceModule;
//# sourceMappingURL=guard.module.js.map