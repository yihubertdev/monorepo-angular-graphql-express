"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePagePostController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const lodash_1 = require("lodash");
let HomePagePostController = class HomePagePostController {
    constructor(_router, _articleFireStore) {
        this._router = _router;
        this._articleFireStore = _articleFireStore;
    }
    async ngOnInit() {
        this.articles = await this._articleFireStore.listPagination(3);
    }
    navigate(id) {
        if ((0, lodash_1.isNil)(id)) {
            return;
        }
        this._router.navigate(["posts", `article`, `${id}`]);
    }
};
HomePagePostController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "home-page-post-controller",
        template: `
    <mat-card
      class="bottom-margin-card"
      *ngFor="let article of articles"
      (click)="navigate(article.id)">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>Shiba Inu</mat-card-title>
          <mat-card-subtitle>{{ article.title }}</mat-card-subtitle>
          <img
            mat-card-sm-image
            src="https://material.angular.io/assets/img/examples/shiba2.jpg" />
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p class="text-overflow-card">
          The Shiba Inu is the smallest of the six original and distinct spitz
          breeds of dog from Japan. A small, agile dog that copes very well with
          mountainous terrain, the Shiba Inu was originally bred for hunting.
        </p></mat-card-content
      >
    </mat-card>
  `,
        styleUrls: ["../home-page-post.style.css"],
    })
], HomePagePostController);
exports.HomePagePostController = HomePagePostController;
//# sourceMappingURL=home-page-post.controller.js.map