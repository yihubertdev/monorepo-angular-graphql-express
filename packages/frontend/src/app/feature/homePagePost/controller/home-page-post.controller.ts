import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isNil } from "lodash";
import { IArticle } from "src/app/core/models/blog.type";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <mat-card class="bottom-margin-card" *ngFor="let article of articles" (click)="navigate(article.id)">
      <mat-card-title-group>
        <mat-card-subtitle>{{ article.title }}</mat-card-subtitle>
        <img mat-card-sm-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" />
      </mat-card-title-group>
      <mat-card-content>
        <p class="text-overflow-card">
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile
          dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.
        </p></mat-card-content
      >
    </mat-card>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  public articles?: IArticle[];

  constructor(private _router: Router, private _articleFireStore: ArticleFireStore) {}

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
