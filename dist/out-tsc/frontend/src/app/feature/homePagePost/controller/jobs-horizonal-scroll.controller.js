"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsHorizonalScrollController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let JobsHorizonalScrollController = class JobsHorizonalScrollController {
    constructor(_articleFireStore) {
        this._articleFireStore = _articleFireStore;
    }
    async ngOnInit() {
        this.articles = await this._articleFireStore.listPagination(3);
    }
};
JobsHorizonalScrollController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "jobs-horizonal-scroll-controller",
        template: `
    <div class="horizonal-scroll-section">
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
        styleUrls: ["../home-page-post.style.css"],
    })
], JobsHorizonalScrollController);
exports.JobsHorizonalScrollController = JobsHorizonalScrollController;
//# sourceMappingURL=jobs-horizonal-scroll.controller.js.map