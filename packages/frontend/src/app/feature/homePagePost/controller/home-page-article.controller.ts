import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IArticle } from "blog";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-article-controller",
  template: `
    <mat-card
      class="mb-2"
      *ngFor="let article of articles?.data"
      (click)="navigate(article.id)">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>{{ article.title }}</mat-card-title>
          <mat-card-subtitle>{{ article.subTitle }}</mat-card-subtitle>
          <img
            mat-card-sm-image
            src="https://material.angular.io/assets/img/examples/shiba2.jpg" />
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p
          class="text-overflow-card"
          [innerHTML]="article.description"></p
      ></mat-card-content>
    </mat-card>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePageArticleController implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();

  public articles?: {
    data: IArticle[];
    hasFile: boolean;
  };

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.articles) return;
    this.articles = await this._articleFireStore.list(3);
    this.isLoading.emit(false);
  }

  public navigate(id?: string) {
    if (!id) {
      return;
    }

    this._router.navigate(["home", "article", `${id}`]);
  }
}
