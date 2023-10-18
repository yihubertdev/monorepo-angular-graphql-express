"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSettingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const expansion_1 = require("@angular/material/expansion");
const account_settings_controller_1 = require("./controller/account-settings.controller");
const form_input_list_module_1 = require("src/app/shared/components/formInputList/form-input-list.module");
const sign_out_controller_1 = require("./controller/sign-out.controller");
const button_1 = require("@angular/material/button");
let AccountSettingModule = class AccountSettingModule {
};
AccountSettingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [account_settings_controller_1.AccountSettingControllerComponent, sign_out_controller_1.SignOutControllerComponent],
        imports: [
            common_1.CommonModule,
            expansion_1.MatExpansionModule,
            form_input_list_module_1.FormInputListModule,
            button_1.MatButtonModule,
        ],
        exports: [account_settings_controller_1.AccountSettingControllerComponent, sign_out_controller_1.SignOutControllerComponent],
    })
], AccountSettingModule);
exports.AccountSettingModule = AccountSettingModule;
//# sourceMappingURL=account-settings.module.js.map