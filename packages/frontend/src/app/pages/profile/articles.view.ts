import { Component, Input } from "@angular/core";
import { HomePageArticleController } from "../../feature/homePagePost/home-page-article.controller";

@Component({
  standalone: true,
  imports: [HomePageArticleController],
  template: `
    <div class="container">
      <!--justify-content-center center the inner col-->
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <home-page-article-controller
            [userId]="id"></home-page-article-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class UsersView {
  @Input() id?: string;
}
