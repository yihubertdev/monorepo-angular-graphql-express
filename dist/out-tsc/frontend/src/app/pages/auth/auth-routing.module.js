"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const guard_module_1 = require("src/app/core/services/routeGuard/guard.module");
const login_guard_1 = require("src/app/core/services/routeGuard/login.guard");
const user_guard_1 = require("src/app/core/services/routeGuard/user.guard");
const account_setting_view_1 = require("./view/account-setting.view");
const login_view_1 = require("./view/login.view");
const sign_up_view_1 = require("./view/sign-up.view");
const routes = [
    { path: "", redirectTo: "me", pathMatch: "full" },
    {
        path: "me",
        canActivate: [user_guard_1.UserGuardService],
        component: account_setting_view_1.AccountViewComponent,
    },
    { path: "login", canActivate: [login_guard_1.LoginGuardService], component: login_view_1.LoginView },
    { path: "signup", component: sign_up_view_1.SignUpView },
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes), guard_module_1.GuardServiceModule],
        exports: [router_1.RouterModule],
    })
], AuthRoutingModule);
exports.AuthRoutingModule = AuthRoutingModule;
//# sourceMappingURL=auth-routing.module.js.map