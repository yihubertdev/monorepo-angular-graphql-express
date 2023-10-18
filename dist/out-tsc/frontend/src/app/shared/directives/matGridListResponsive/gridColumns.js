"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridColsDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const layout_1 = require("@angular/cdk/layout");
let GridColsDirective = class GridColsDirective {
    get cols() {
        return this.attrGridCols;
    }
    set cols(map) {
        if (map && "object" === typeof map) {
            this.attrGridCols = map;
        }
    }
    constructor(gridListElement, breakpointObserver) {
        this.gridListElement = gridListElement;
        this.breakpointObserver = breakpointObserver;
        this.attrGridCols = { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 };
        if (this.gridListElement != null) {
            this.gridListElement.cols = this.attrGridCols.md;
        }
    }
    ngOnInit() {
        if (this.gridListElement != null) {
            this.gridListElement.cols = this.attrGridCols.md;
        }
        this.breakpointObserver
            .observe([
            layout_1.Breakpoints.XSmall,
            layout_1.Breakpoints.Small,
            layout_1.Breakpoints.Medium,
            layout_1.Breakpoints.Large,
            layout_1.Breakpoints.XLarge,
        ])
            .subscribe((result) => {
            if (result.breakpoints[layout_1.Breakpoints.XSmall]) {
                this.gridListElement.cols = this.attrGridCols.xs;
            }
            if (result.breakpoints[layout_1.Breakpoints.Small]) {
                this.gridListElement.cols = this.attrGridCols.sm;
            }
            if (result.breakpoints[layout_1.Breakpoints.Medium]) {
                this.gridListElement.cols = this.attrGridCols.md;
            }
            if (result.breakpoints[layout_1.Breakpoints.Large]) {
                this.gridListElement.cols = this.attrGridCols.lg;
            }
            if (result.breakpoints[layout_1.Breakpoints.XLarge]) {
                this.gridListElement.cols = this.attrGridCols.xl;
            }
        });
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], GridColsDirective.prototype, "attrGridCols", void 0);
GridColsDirective = tslib_1.__decorate([
    (0, core_1.Directive)({
        selector: "[attrGridCols]",
    })
], GridColsDirective);
exports.GridColsDirective = GridColsDirective;
//# sourceMappingURL=gridColumns.js.map