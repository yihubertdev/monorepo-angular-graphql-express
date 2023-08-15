import { Component, OnInit } from "@angular/core";
import { IArticle } from "src/app/core/models/blog.type";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
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
      [hidePageSize]="true"
      aria-label="Select page">
    </mat-paginator>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class ChatTopicPostController implements OnInit {
  public articles?: IArticle[];

  constructor(private _articleFireStore: ArticleFireStore) {}

  async ngOnInit(): Promise<void> {
    this.articles = await this._articleFireStore.listPagination(3);
  }
}
