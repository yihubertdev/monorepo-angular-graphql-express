"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let PostCategoryControllerComponent = class PostCategoryControllerComponent {
    constructor() {
        this.postCategoryList = [];
    }
    ngOnInit() {
        this.postCategoryList = [
            {
                icon: "computer",
                number: 17,
                category: "technology",
            },
            {
                icon: "self_improvement",
                number: 2,
                category: "selfImprovement",
            },
            {
                icon: "sports_basketball",
                number: 24,
                category: "sport",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
            {
                icon: "sms",
                number: 24,
                category: "message",
            },
        ];
    }
};
PostCategoryControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "post-category-controller",
        template: `
    <mat-chip-listbox>
      <div class="new-chip-list-wrapper">
        <mat-chip *ngFor="let category of postCategoryList">
          <mat-icon>{{ category.icon }}</mat-icon>
          {{ category.number }}
        </mat-chip>
      </div>
    </mat-chip-listbox>
  `,
        styleUrls: ["../post-category.style.css"],
    })
], PostCategoryControllerComponent);
exports.PostCategoryControllerComponent = PostCategoryControllerComponent;
//# sourceMappingURL=post-category.controller.js.map