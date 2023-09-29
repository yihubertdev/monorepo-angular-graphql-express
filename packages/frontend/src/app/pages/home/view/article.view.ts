import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "article-view",
  template: `
    <div class="container">
      <div class="row mb-4 justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <article-post-controller
            [articleContent]="articleContent"
            [articleTitle]="articleTitle"></article-post-controller>
        </div>
      </div>

      <div class="row mb-4 justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <user-profile-controller
            [userId]="articleUserId"
            style="width: 100%; height: 100%; margin-bottom: 5%;"></user-profile-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class ArticleViewComponent implements OnInit {
  public articleId: string = "";
  public articleContent: string = "";
  public articleTitle: string = "";
  public articleUserId: string = "";
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _articleFireStore: ArticleFireStore
  ) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe(
      (params: Params) => (this.articleId = params["id"])
    );
    const article = await this._articleFireStore.retrieveById(this.articleId);

    if (!article) {
      this._router.navigateByUrl("posts");
    }

    const { content, title, userId } = article;

    this.articleContent = content;
    this.articleTitle = title;
    this.articleUserId = userId;
  }
}
