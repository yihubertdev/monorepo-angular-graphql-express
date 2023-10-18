"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const email_login_controller_1 = require("./controller/email-login.controller");
const form_input_list_module_1 = require("src/app/shared/components/formInputList/form-input-list.module");
const form_field_1 = require("@angular/material/form-field");
const snack_bar_1 = require("@angular/material/snack-bar");
const oauth_login_controller_1 = require("./controller/oauth-login.controller");
const icon_1 = require("@angular/material/icon");
const list_1 = require("@angular/material/list");
const bottom_sheet_1 = require("@angular/material/bottom-sheet");
const oauth_options_controller_1 = require("./controller/oauth-options.controller");
const email_signup_controller_1 = require("./controller/email-signup.controller");
let LoginModule = class LoginModule {
};
LoginModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            email_login_controller_1.EmailLoginControllerComponent,
            email_signup_controller_1.EmailSignUpController,
            oauth_login_controller_1.OAuthLoginControllerComponent,
            oauth_options_controller_1.OAuthOptionsComponent,
        ],
        imports: [
            common_1.CommonModule,
            form_input_list_module_1.FormInputListModule,
            form_field_1.MatFormFieldModule,
            snack_bar_1.MatSnackBarModule,
            icon_1.MatIconModule,
            list_1.MatListModule,
            bottom_sheet_1.MatBottomSheetModule,
        ],
        exports: [
            email_login_controller_1.EmailLoginControllerComponent,
            email_signup_controller_1.EmailSignUpController,
            oauth_login_controller_1.OAuthLoginControllerComponent,
            oauth_options_controller_1.OAuthOptionsComponent,
        ],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map