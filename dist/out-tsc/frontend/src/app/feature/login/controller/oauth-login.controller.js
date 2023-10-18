"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthLoginControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const user_login_schema_1 = require("src/app/core/joiSchema/user-login.schema");
const auth_static_1 = require("src/app/core/static/auth.static");
const oauth_options_controller_1 = require("./oauth-options.controller");
const googleLogoURL = "/assets/images/Google.svg";
let OAuthLoginControllerComponent = class OAuthLoginControllerComponent {
    constructor(matIconRegistry, domSanitizer, _bottomSheet) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this._bottomSheet = _bottomSheet;
        this.formInputList = auth_static_1.userLoginFormList;
        this.validatorSchema = user_login_schema_1.userLoginSchema;
        this.error = "";
    }
    ngOnInit() {
        this.matIconRegistry.addSvgIconLiteral("googleIcon", this.domSanitizer.bypassSecurityTrustHtml(googleLogoURL));
    }
    openOAuthOptions() {
        this._bottomSheet.open(oauth_options_controller_1.OAuthOptionsComponent);
    }
};
OAuthLoginControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "oauth-login-controller",
        template: ` <button
    mat-raised-button
    style="padding: 1rem;"
    (click)="openOAuthOptions()">
    <mat-icon>person</mat-icon> Choose OAuth Options
  </button>`,
        styleUrls: ["../login.style.css"],
    })
], OAuthLoginControllerComponent);
exports.OAuthLoginControllerComponent = OAuthLoginControllerComponent;
//# sourceMappingURL=oauth-login.controller.js.map