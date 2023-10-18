"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridColSpanDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const layout_1 = require("@angular/cdk/layout");
let GridColSpanDirective = class GridColSpanDirective {
    constructor(gridTileElement, breakpointObserver) {
        this.gridTileElement = gridTileElement;
        this.breakpointObserver = breakpointObserver;
        this.attrGridColSpan = {
            xs: {
                colspan: 1,
                rowspan: 1,
            },
            sm: {
                colspan: 2,
                rowspan: 2,
            },
            md: {
                colspan: 4,
                rowspan: 4,
            },
            lg: {
                colspan: 6,
                rowspan: 6,
            },
            xl: {
                colspan: 8,
                rowspan: 8,
            },
        };
        if (this.gridTileElement != null) {
            this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
            this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
        }
    }
    ngOnInit() {
        if (this.gridTileElement != null) {
            this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
            this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
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
                this.gridTileElement.colspan = this.attrGridColSpan.xs.colspan;
                this.gridTileElement.rowspan = this.attrGridColSpan.xs.rowspan;
            }
            if (result.breakpoints[layout_1.Breakpoints.Small]) {
                this.gridTileElement.colspan = this.attrGridColSpan.sm.colspan;
                this.gridTileElement.rowspan = this.attrGridColSpan.sm.rowspan;
            }
            if (result.breakpoints[layout_1.Breakpoints.Medium]) {
                this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
                this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
            }
            if (result.breakpoints[layout_1.Breakpoints.Large]) {
                this.gridTileElement.colspan = this.attrGridColSpan.lg.colspan;
                this.gridTileElement.rowspan = this.attrGridColSpan.lg.rowspan;
            }
            if (result.breakpoints[layout_1.Breakpoints.XLarge]) {
                this.gridTileElement.colspan = this.attrGridColSpan.xl.colspan;
                this.gridTileElement.rowspan = this.attrGridColSpan.xl.rowspan;
            }
        });
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], GridColSpanDirective.prototype, "attrGridColSpan", void 0);
GridColSpanDirective = tslib_1.__decorate([
    (0, core_1.Directive)({
        selector: "[attrGridColSpan]",
    })
], GridColSpanDirective);
exports.GridColSpanDirective = GridColSpanDirective;
//# sourceMappingURL=grildColSpan.js.map