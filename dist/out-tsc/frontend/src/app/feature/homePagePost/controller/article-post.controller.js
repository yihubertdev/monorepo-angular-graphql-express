"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlePostControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let ArticlePostControllerComponent = class ArticlePostControllerComponent {
    constructor() {
        this.articleContent = "";
        this.articleTitle = "";
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], ArticlePostControllerComponent.prototype, "articleContent", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], ArticlePostControllerComponent.prototype, "articleTitle", void 0);
ArticlePostControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "article-post-controller",
        template: `
    <h1 style="font-size: xx-large">{{ this.articleTitle }}</h1>
    <quill-view
      [content]="articleContent"
      format="html"
      theme="snow"></quill-view>
  `,
        styleUrls: ["../home-page-post.style.css"],
    })
], ArticlePostControllerComponent);
exports.ArticlePostControllerComponent = ArticlePostControllerComponent;
//# sourceMappingURL=article-post.controller.js.map