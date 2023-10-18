"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatTopicPostController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let ChatTopicPostController = class ChatTopicPostController {
    constructor(_articleFireStore) {
        this._articleFireStore = _articleFireStore;
    }
    async ngOnInit() {
        this.articles = await this._articleFireStore.listPagination(3);
    }
};
ChatTopicPostController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "chat-topic-post-controller",
        template: `
    <mat-list
      role="list"
      style="background-color: white; height: 90%;">
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa1</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa2</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa3</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa4</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa5</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa5</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa5</mat-list-item
      >
      <mat-divider></mat-divider>
      <mat-list-item
        class="list-item-height"
        role="listitem"
        >BlaBLaBLa5</mat-list-item
      >
    </mat-list>
    <mat-paginator
      [length]="100"
      [pageSize]="10"
      aria-label="Select page">
    </mat-paginator>
  `,
        styleUrls: ["../home-page-post.style.css"],
    })
], ChatTopicPostController);
exports.ChatTopicPostController = ChatTopicPostController;
//# sourceMappingURL=chat-topic-post.controller.js.map