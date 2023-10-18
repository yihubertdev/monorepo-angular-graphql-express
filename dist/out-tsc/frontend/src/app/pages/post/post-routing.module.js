"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const post_view_1 = require("./view/post.view");
const article_view_1 = require("./view/article.view");
const routes = [
    { path: "", component: post_view_1.PostViewComponent },
    { path: "article/:id", component: article_view_1.ArticleViewComponent },
];
let PostRoutingModule = class PostRoutingModule {
};
PostRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], PostRoutingModule);
exports.PostRoutingModule = PostRoutingModule;
//# sourceMappingURL=post-routing.module.js.map