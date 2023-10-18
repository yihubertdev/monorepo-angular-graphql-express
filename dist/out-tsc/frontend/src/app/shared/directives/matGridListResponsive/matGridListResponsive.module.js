"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridListResponsiveDirectiveModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const gridColumns_1 = require("./gridColumns");
const grildColSpan_1 = require("./grildColSpan");
let GridListResponsiveDirectiveModule = class GridListResponsiveDirectiveModule {
};
GridListResponsiveDirectiveModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [gridColumns_1.GridColsDirective, grildColSpan_1.GridColSpanDirective],
        imports: [],
        exports: [gridColumns_1.GridColsDirective, grildColSpan_1.GridColSpanDirective],
    })
], GridListResponsiveDirectiveModule);
exports.GridListResponsiveDirectiveModule = GridListResponsiveDirectiveModule;
//# sourceMappingURL=matGridListResponsive.module.js.map