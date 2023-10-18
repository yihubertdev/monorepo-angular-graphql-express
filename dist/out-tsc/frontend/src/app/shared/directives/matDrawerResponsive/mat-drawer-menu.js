"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatDrawerMenuDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const layout_1 = require("@angular/cdk/layout");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
let MatDrawerMenuDirective = class MatDrawerMenuDirective {
    constructor(authService, matDrawerElement, breakpointObserver) {
        this.authService = authService;
        this.matDrawerElement = matDrawerElement;
        this.breakpointObserver = breakpointObserver;
        this.attrOpenedStatus = {
            xs: false,
            sm: false,
            md: true,
            lg: true,
            xl: true,
        };
    }
    ngOnInit() {
        this.authService.userAuthObserver$
            .pipe((0, rxjs_1.map)((user) => {
            if (!user) {
                return;
            }
            return {
                id: user.id,
                role: user.role,
            };
        }))
            .subscribe((user) => {
            if (this.matDrawerElement == null ||
                !user ||
                (0, lodash_1.isEmpty)(user.id) ||
                this.authService.isVisitor(user.role)) {
                this.matDrawerElement.opened = false;
                return;
            }
            this.matDrawerElement.opened = true;
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
                    this.matDrawerElement.opened = this.attrOpenedStatus.xs;
                }
                if (result.breakpoints[layout_1.Breakpoints.Small]) {
                    this.matDrawerElement.opened = this.attrOpenedStatus.sm;
                }
                if (result.breakpoints[layout_1.Breakpoints.Medium]) {
                    this.matDrawerElement.opened = this.attrOpenedStatus.md;
                }
                if (result.breakpoints[layout_1.Breakpoints.Large]) {
                    this.matDrawerElement.opened = this.attrOpenedStatus.lg;
                }
                if (result.breakpoints[layout_1.Breakpoints.XLarge]) {
                    this.matDrawerElement.opened = this.attrOpenedStatus.xl;
                }
            });
        });
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], MatDrawerMenuDirective.prototype, "attrOpenedStatus", void 0);
MatDrawerMenuDirective = tslib_1.__decorate([
    (0, core_1.Directive)({
        selector: "[attrOpenedStatus]",
    })
], MatDrawerMenuDirective);
exports.MatDrawerMenuDirective = MatDrawerMenuDirective;
//# sourceMappingURL=mat-drawer-menu.js.map