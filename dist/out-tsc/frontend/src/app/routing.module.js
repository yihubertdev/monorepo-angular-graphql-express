"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const routes = [
    { path: "", redirectTo: "posts", pathMatch: "full" },
    {
        path: "posts",
        loadChildren: () => Promise.resolve().then(() => tslib_1.__importStar(require("./pages/post/post.module"))).then((module) => module.PostModule),
    },
    {
        path: "edit",
        loadChildren: () => Promise.resolve().then(() => tslib_1.__importStar(require("./pages/edit/edit.module"))).then((module) => module.EditModule),
    },
    {
        path: "search",
        loadChildren: () => Promise.resolve().then(() => tslib_1.__importStar(require("./pages/search/search.module"))).then((module) => module.SearchModule),
    },
    {
        path: "payment",
        loadChildren: () => Promise.resolve().then(() => tslib_1.__importStar(require("./pages/payment/payment.module"))).then((module) => module.PaymentModule),
    },
    {
        path: "account",
        loadChildren: () => Promise.resolve().then(() => tslib_1.__importStar(require("./pages/auth/auth.module"))).then((module) => module.AuthModule),
    },
];
let RoutingModule = class RoutingModule {
};
RoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map