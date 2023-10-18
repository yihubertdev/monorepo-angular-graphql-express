"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMenuController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
let HeaderMenuController = class HeaderMenuController {
    constructor(router) {
        this.router = router;
        this.footerIconLayout = post_static_1.homePageMenus;
    }
    ngOnInit() {
        console.log(this.router.config);
    }
};
HeaderMenuController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "header-menu-controller",
        template: ` <ng-container>
    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>

    <mat-menu #vertebrates="matMenu">
      <button mat-menu-item>Birds</button>
      <button mat-menu-item>Mammals</button>
    </mat-menu>

    <mat-menu #invertebrates="matMenu">
      <button mat-menu-item>Insects</button>
      <button mat-menu-item>Molluscs</button>
      <button mat-menu-item>Crustaceans</button>
      <button mat-menu-item>Corals</button>
      <button mat-menu-item>Arachnids</button>
      <button mat-menu-item>Velvet worms</button>
      <button mat-menu-item>Horseshoe crabs</button>
    </mat-menu>

    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>

    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>
  </ng-container>`,
        styleUrls: [],
    })
], HeaderMenuController);
exports.HeaderMenuController = HeaderMenuController;
//# sourceMappingURL=header.controller.js.map