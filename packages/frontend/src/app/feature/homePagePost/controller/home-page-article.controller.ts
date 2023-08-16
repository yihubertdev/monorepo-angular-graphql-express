import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isNil } from "lodash";
import { IArticle } from "src/app/core/models/blog.type";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-article-controller",
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
        <p
          class="text-overflow-card"
          [innerHTML]="article.content"></p
      ></mat-card-content>
    </mat-card>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePageArticleController implements OnInit {
  public articles?: IArticle[];

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore
  ) {}

  async ngOnInit(): Promise<void> {
    this.articles = await this._articleFireStore.listPagination(3);
  }

  public navigate(id?: string) {
    if (isNil(id)) {
      return;
    }

    this._router.navigate(["posts", `article`, `${id}`]);
  }
}
