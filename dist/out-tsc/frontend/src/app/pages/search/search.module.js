"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const search_view_1 = require("./view/search.view");
const search_routing_module_1 = require("./search-routing.module");
const grid_list_1 = require("@angular/material/grid-list");
const card_1 = require("@angular/material/card");
let SearchModule = class SearchModule {
};
SearchModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [search_view_1.SearchViewComponent],
        imports: [
            common_1.CommonModule,
            search_routing_module_1.SearchRoutingModule,
            grid_list_1.MatGridListModule,
            card_1.MatCardModule,
        ],
        exports: [search_view_1.SearchViewComponent],
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map