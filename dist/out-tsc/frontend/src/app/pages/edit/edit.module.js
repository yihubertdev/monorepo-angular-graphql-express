"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const edit_routing_module_1 = require("./edit-routing.module");
const edit_blog_view_1 = require("./view/edit-blog.view");
const grid_list_1 = require("@angular/material/grid-list");
const edit_blog_module_1 = require("src/app/feature/editBlog/edit-blog.module");
const edit_article_module_1 = require("src/app/feature/editArticle/edit-article.module");
const edit_article_view_1 = require("./view/edit-article.view");
let EditModule = class EditModule {
};
EditModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [edit_blog_view_1.EditBlogViewComponent, edit_article_view_1.EditArticleView],
        imports: [
            common_1.CommonModule,
            edit_routing_module_1.EditRoutingModule,
            grid_list_1.MatGridListModule,
            edit_blog_module_1.EditBlogModule,
            edit_article_module_1.EditArticleModule,
        ],
        exports: [edit_blog_view_1.EditBlogViewComponent, edit_article_view_1.EditArticleView],
    })
], EditModule);
exports.EditModule = EditModule;
//# sourceMappingURL=edit.module.js.map