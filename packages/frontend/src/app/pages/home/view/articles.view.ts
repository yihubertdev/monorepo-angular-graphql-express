import { Component } from "@angular/core";
import { IPostList } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { postList } from "src/app/core/static/post.static";

@Component({
  selector: "post-view",
  template: `
    <div class="responsive-post-section">
      <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
      <div class="row mb-3 mx-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <post-category-controller></post-category-controller>
        </div>
      </div>
      <div class="row mb-3 mx-2 justify-content-center">
        <!-- container responsive-height-container max-width-container container-overflow-vertical -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
          <home-page-article-controller></home-page-article-controller>
        </div>
      </div>

      <add-text-editor-controller></add-text-editor-controller>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class ArticlesViewComponent {
  postList: IPostList[];
  images = [
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
    "https://material.angular.io/assets/img/examples/shiba2.jpg",
  ];

  constructor(private authService: AuthService) {
    this.postList = postList;
  }
}
