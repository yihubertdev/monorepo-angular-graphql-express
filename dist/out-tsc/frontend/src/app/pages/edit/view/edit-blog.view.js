"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBlogViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let EditBlogViewComponent = class EditBlogViewComponent {
    constructor() { }
};
EditBlogViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "edit-blog-view",
        template: `
    <div style="width: 100vw; height: 90dvh">
      <mat-grid-list
        cols="1"
        rowHeight="90dvh">
        <mat-grid-tile
          colspan="1"
          rowspan="1">
          <div class="grid-tile-align-up-content">
            <edit-blog-controller></edit-blog-controller>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
        styleUrls: ["../edit.style.css"],
    })
], EditBlogViewComponent);
exports.EditBlogViewComponent = EditBlogViewComponent;
//# sourceMappingURL=edit-blog.view.js.map