"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const search_view_1 = require("./view/search.view");
const routes = [{ path: "", component: search_view_1.SearchViewComponent }];
let SearchRoutingModule = class SearchRoutingModule {
};
SearchRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], SearchRoutingModule);
exports.SearchRoutingModule = SearchRoutingModule;
//# sourceMappingURL=search-routing.module.js.map