"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterMenuController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
let FooterMenuController = class FooterMenuController {
    constructor() {
        this.footerIconLayout = post_static_1.homePageMenus;
    }
};
FooterMenuController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "footer-menu-controller",
        template: `
    <ng-container>
      <nav
        mat-tab-nav-bar
        class="child-centered mat-tab-group-inverted-header main-nav"
        [tabPanel]="tabPanel">
        <a
          mat-tab-link
          [routerLink]="icon.link"
          [style.min-width]="icon.width"
          *ngFor="let icon of footerIconLayout">
          <mat-icon>{{ icon.iconName }}</mat-icon>
        </a>
      </nav>
      <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
    </ng-container>
  `,
        styleUrls: [],
    })
], FooterMenuController);
exports.FooterMenuController = FooterMenuController;
//# sourceMappingURL=footer.controller.js.map