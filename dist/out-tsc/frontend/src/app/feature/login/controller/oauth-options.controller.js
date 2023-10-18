"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthOptionsComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let OAuthOptionsComponent = class OAuthOptionsComponent {
    constructor(_bottomSheetRef, authService) {
        this._bottomSheetRef = _bottomSheetRef;
        this.authService = authService;
    }
    async signInWithGoogle(event) {
        await this.authService.googleAuthSignIn();
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    async signInWithTwitter(event) {
        await this.authService.twitterAuthSignIn();
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    async signInAnonymously(event) {
        await this.authService.anonymousSignIn();
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
};
OAuthOptionsComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "bottom-sheet-overview-example-sheet",
        template: `<mat-nav-list>
    <a
      mat-list-item
      (click)="signInWithGoogle($event)">
      <span mat-line>Google Account</span>
      <span mat-line>Sign In With Google</span>
    </a>

    <a
      mat-list-item
      (click)="signInAnonymously($event)">
      <span mat-line>Anonymous</span>
      <span mat-line>Sign In Anonymously</span>
    </a>
  </mat-nav-list>`,
    })
], OAuthOptionsComponent);
exports.OAuthOptionsComponent = OAuthOptionsComponent;
//# sourceMappingURL=oauth-options.controller.js.map