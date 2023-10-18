"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSignUpController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const user_login_schema_1 = require("src/app/core/joiSchema/user-login.schema");
const constants_1 = require("src/app/core/models/constants");
const auth_static_1 = require("src/app/core/static/auth.static");
let EmailSignUpController = class EmailSignUpController {
    constructor(_router, authService, _snackBar) {
        this._router = _router;
        this.authService = authService;
        this._snackBar = _snackBar;
        this.formInputList = auth_static_1.userSignUpFormList;
        this.validatorSchema = user_login_schema_1.userSignUpSchema;
        this.error = "";
    }
    ngOnInit() {
        const i = 1;
    }
    async signup(formValue) {
        const { username, email, password } = formValue;
        const data = {
            username,
            email,
            password,
        };
        try {
            await this.authService.register(data);
            this._router.navigateByUrl("/account/login");
        }
        catch (err) {
            this._snackBar.open(constants_1.SIGNUP_FAILED, constants_1.POP_UP_ACTION, {
                duration: constants_1.POP_UP_DISMISS_DURATION,
            });
        }
    }
};
EmailSignUpController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "email-signup-controller",
        template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EmailSignUpController"
    [validatorSchema]="validatorSchema"
    buttonName="SignUp"
    (formValue)="signup($event)"></form-input-list-component>`,
        styleUrls: [],
    })
], EmailSignUpController);
exports.EmailSignUpController = EmailSignUpController;
//# sourceMappingURL=email-signup.controller.js.map