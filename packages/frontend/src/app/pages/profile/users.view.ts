import { Component, Input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/home-page-post.controller";
import { HomePageArticleController } from "../../feature/homePagePost/home-page-article.controller";

@Component({
  standalone: true,
  imports: [HomePagePostController, HomePageArticleController, MatTabsModule],
  template: `
    <mat-tab-group>
      <mat-tab label="Posts">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-post-controller
                [userId]="id"></home-page-post-controller>
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Articles">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-article-controller
                [userId]="id"></home-page-article-controller>
            </div>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: [],
})
export default class UsersView {
  @Input() id?: string;
}
