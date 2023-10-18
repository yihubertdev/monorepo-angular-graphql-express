"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOutControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let SignOutControllerComponent = class SignOutControllerComponent {
    constructor(authService, _router) {
        this.authService = authService;
        this._router = _router;
    }
    ngOnInit() {
        const i = 1;
    }
    async signout() {
        await this.authService.logout();
        this._router.navigateByUrl("/account/login");
    }
};
SignOutControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "sign-out-controller",
        template: ` <button
    mat-raised-button
    color="primary"
    (click)="signout()">
    Sign Out
  </button>`,
        styleUrls: [],
    })
], SignOutControllerComponent);
exports.SignOutControllerComponent = SignOutControllerComponent;
//# sourceMappingURL=sign-out.controller.js.map