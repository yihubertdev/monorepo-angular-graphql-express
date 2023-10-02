import { Component, Input, OnInit } from "@angular/core";
import { ArticleFireStore } from "../../core/services/fireStore/blog.firestore";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";
import { UserProfileController } from "../../feature/userProfile/user-profile.controller";
import { IArticle } from "sources-types";

@Component({
  standalone: true,
  imports: [HomePagePostModule, UserProfileController],
  template: `
    <div class="container">
      <div class="row mb-4 justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <article-post-controller
            [article]="article"></article-post-controller>
        </div>
      </div>

      <div class="row mb-4 justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <user-profile-controller
            [userId]="article?.userId"
            style="width: 100%; height: 100%; margin-bottom: 5%;"></user-profile-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./home.style.css"],
})
export default class ArticleView implements OnInit {
  @Input() id?: string;
  public articleId?: string;
  public article?: IArticle;

  constructor(private _articleFireStore: ArticleFireStore) {}

  async ngOnInit() {
    if (!this.id) return;
    this.articleId = this.id;
    this.article = await this._articleFireStore.retrieveById(this.articleId);
  }
}
