"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailLoginControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const user_login_schema_1 = require("src/app/core/joiSchema/user-login.schema");
const constants_1 = require("src/app/core/models/constants");
const auth_static_1 = require("src/app/core/static/auth.static");
let EmailLoginControllerComponent = class EmailLoginControllerComponent {
    constructor(_router, authService, _snackBar) {
        this._router = _router;
        this.authService = authService;
        this._snackBar = _snackBar;
        this.formInputList = auth_static_1.userLoginFormList;
        this.validatorSchema = user_login_schema_1.userLoginSchema;
        this.error = "";
    }
    ngOnInit() {
        const i = 1;
    }
    async login(formValue) {
        console.log(formValue);
        const data = {
            email: String(formValue["email"]),
            password: String(formValue["password"]),
        };
        try {
            await this.authService.login(data);
            this._router.navigateByUrl("/account/me");
        }
        catch (err) {
            this._snackBar.open(constants_1.LOGIN_FAILED, constants_1.POP_UP_ACTION, {
                duration: constants_1.POP_UP_DISMISS_DURATION,
            });
        }
    }
};
EmailLoginControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "email-login-controller",
        template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="UserLoginFeature"
    [validatorSchema]="validatorSchema"
    buttonName="Login"
    (formValue)="login($event)"></form-input-list-component>`,
        styleUrls: [],
    })
], EmailLoginControllerComponent);
exports.EmailLoginControllerComponent = EmailLoginControllerComponent;
//# sourceMappingURL=email-login.controller.js.map