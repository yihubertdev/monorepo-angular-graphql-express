"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArticleView = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let EditArticleView = class EditArticleView {
    constructor() { }
};
EditArticleView = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "post-view",
        template: `
    <div style="width: 80vw; height: 90dvh">
      <mat-grid-list
        cols="1"
        rowHeight="90dvh">
        <mat-grid-tile
          colspan="1"
          rowspan="1">
          <div class="grid-tile-align-up-center-content">
            <edit-article-controller></edit-article-controller>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
        styleUrls: ["../edit.style.css"],
    })
], EditArticleView);
exports.EditArticleView = EditArticleView;
//# sourceMappingURL=edit-article.view.js.map