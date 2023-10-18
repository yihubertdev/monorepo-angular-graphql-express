"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTextEditorControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const text_editor_options_controller_1 = require("./text-editor-options.controller");
let AddTextEditorControllerComponent = class AddTextEditorControllerComponent {
    constructor(_bottomSheet, authService) {
        this._bottomSheet = _bottomSheet;
        this.authService = authService;
    }
    ngOnInit() {
        this.userAuthObserver$ = this.authService.userAuthObserver$;
    }
    openOAuthOptions() {
        this._bottomSheet.open(text_editor_options_controller_1.TextEditorOptionsComponent);
    }
};
AddTextEditorControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "add-text-editor-controller",
        template: `
    <ng-container *ngIf="(userAuthObserver$ | async)?.id">
      <mat-icon
        class="fab-button icon-display"
        (click)="openOAuthOptions()"
        >add_circle</mat-icon
      >
    </ng-container>
  `,
        styleUrls: ["../add-text-editor.style.css"],
    })
], AddTextEditorControllerComponent);
exports.AddTextEditorControllerComponent = AddTextEditorControllerComponent;
//# sourceMappingURL=add-text-editor.controller.js.map