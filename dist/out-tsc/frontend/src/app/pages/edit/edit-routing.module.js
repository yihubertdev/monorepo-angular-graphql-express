"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const guard_module_1 = require("src/app/core/services/routeGuard/guard.module");
const user_guard_1 = require("src/app/core/services/routeGuard/user.guard");
const edit_article_view_1 = require("./view/edit-article.view");
const edit_blog_view_1 = require("./view/edit-blog.view");
const routes = [
    {
        path: "",
        redirectTo: "me",
        pathMatch: "full",
    },
    {
        path: "article",
        canActivate: [user_guard_1.UserGuardService],
        component: edit_article_view_1.EditArticleView,
    },
    {
        path: "blog",
        canActivate: [user_guard_1.UserGuardService],
        component: edit_blog_view_1.EditBlogViewComponent,
    },
];
let EditRoutingModule = class EditRoutingModule {
};
EditRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes), guard_module_1.GuardServiceModule],
        exports: [router_1.RouterModule],
    })
], EditRoutingModule);
exports.EditRoutingModule = EditRoutingModule;
//# sourceMappingURL=edit-routing.module.js.map