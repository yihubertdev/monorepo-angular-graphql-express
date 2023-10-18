"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopToolMenuController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let TopToolMenuController = class TopToolMenuController {
};
TopToolMenuController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "top-tool-menu-controller",
        template: `
    <span>YooHoo Tech</span>
    <button mat-button>
      <a
        style="text-decoration: none; color: black;"
        routerLink="account/login">
        Login</a
      >
    </button>
    <span class="example-spacer"></span>
    <button
      mat-icon-button
      class="twitter-icon"
      aria-label="twitter">
      <mat-icon
        svgIcon="twitter-icon"
        aria-hidden="false"
        aria-label="twitter"></mat-icon>
    </button>
    <button
      mat-icon-button
      class="google-icon"
      aria-label="google">
      <mat-icon
        svgIcon="google-icon"
        aria-hidden="false"
        aria-label="google"></mat-icon>
    </button>
    <button
      mat-icon-button
      class="linkedln-icon"
      aria-label="linkedln">
      <mat-icon
        svgIcon="linkedln-icon"
        aria-hidden="false"
        aria-label="linkedln"></mat-icon>
    </button>
  `,
        styleUrls: ["../home-page-post.style.css"],
    })
], TopToolMenuController);
exports.TopToolMenuController = TopToolMenuController;
//# sourceMappingURL=top-toolbar.controller.js.map