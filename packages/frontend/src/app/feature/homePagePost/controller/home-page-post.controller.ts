import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isNil } from "lodash";
import { IArticle } from "src/app/core/models/blog.type";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <mat-card
      class="bottom-margin-card"
      *ngFor="let article of articles"
      (click)="navigate(article.id)">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-subtitle>{{
            article.createdAt | date : "yyyy-MM-dd h:mm:ss a"
          }}</mat-card-subtitle>
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p
          class="text-overflow-card"
          [innerHTML]="article.content"></p
      ></mat-card-content>
    </mat-card>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  public articles?: IArticle[];

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore
  ) {}

  async ngOnInit(): Promise<void> {
    this.articles = await this._articleFireStore.listPagination(5);

    console.log(this.articles);
  }

  public navigate(id?: string) {
    if (isNil(id)) {
      return;
    }

    this._router.navigate(["home", `article`, `${id}`]);
  }
}
