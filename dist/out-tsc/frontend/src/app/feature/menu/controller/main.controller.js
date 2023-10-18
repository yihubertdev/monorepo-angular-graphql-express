"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
let MainMenuController = class MainMenuController {
    constructor() {
        this.menus = post_static_1.homePageMenus;
    }
};
MainMenuController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "drawer-menu-controller",
        template: `
    <mat-nav-list>
      <a
        mat-list-item
        [routerLink]="menu.link"
        *ngFor="let menu of menus"
        routerLinkActive="active-list-item">
        {{ menu.description }}</a
      >
    </mat-nav-list>
  `,
        styleUrls: ["../menu.style.css"],
    })
], MainMenuController);
exports.MainMenuController = MainMenuController;
//# sourceMappingURL=main.controller.js.map