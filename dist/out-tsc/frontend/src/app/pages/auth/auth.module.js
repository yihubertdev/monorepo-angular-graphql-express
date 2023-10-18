"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const expansion_1 = require("@angular/material/expansion");
const account_setting_view_1 = require("./view/account-setting.view");
const account_settings_module_1 = require("src/app/feature/accountSettings/account-settings.module");
const auth_routing_module_1 = require("./auth-routing.module");
const login_view_1 = require("./view/login.view");
const sign_up_view_1 = require("./view/sign-up.view");
const grid_list_1 = require("@angular/material/grid-list");
const card_1 = require("@angular/material/card");
const user_profile_module_1 = require("src/app/feature/userProfile/user-profile.module");
const login_module_1 = require("src/app/feature/login/login.module");
const matGridListResponsive_module_1 = require("src/app/shared/directives/matGridListResponsive/matGridListResponsive.module");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [account_setting_view_1.AccountViewComponent, login_view_1.LoginView, sign_up_view_1.SignUpView],
        imports: [
            common_1.CommonModule,
            expansion_1.MatExpansionModule,
            account_settings_module_1.AccountSettingModule,
            auth_routing_module_1.AuthRoutingModule,
            grid_list_1.MatGridListModule,
            card_1.MatCardModule,
            user_profile_module_1.UserProfileModule,
            login_module_1.LoginModule,
            matGridListResponsive_module_1.GridListResponsiveDirectiveModule,
        ],
        exports: [account_setting_view_1.AccountViewComponent, login_view_1.LoginView, sign_up_view_1.SignUpView],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map