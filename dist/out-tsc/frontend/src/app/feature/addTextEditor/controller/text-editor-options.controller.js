"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEditorOptionsComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let TextEditorOptionsComponent = class TextEditorOptionsComponent {
    constructor(_bottomSheetRef, _router) {
        this._bottomSheetRef = _bottomSheetRef;
        this._router = _router;
    }
    async addBlog(event) {
        this._router.navigateByUrl("edit/blog");
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    async addArticle(event) {
        this._router.navigateByUrl("edit/article");
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
};
TextEditorOptionsComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "bottom-sheet-overview-example-sheet",
        template: `<mat-nav-list>
    <a
      mat-list-item
      (click)="addBlog($event)">
      <span mat-line>Add Blog</span>
      <span mat-line>Edit new blog</span>
    </a>

    <a
      mat-list-item
      (click)="addArticle($event)">
      <span mat-line>Add Article</span>
      <span mat-line>Edit new article</span>
    </a>
  </mat-nav-list>`,
    })
], TextEditorOptionsComponent);
exports.TextEditorOptionsComponent = TextEditorOptionsComponent;
//# sourceMappingURL=text-editor-options.controller.js.map