import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isNil } from "lodash";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "article-post-controller",
  template: `
    <h1 style="font-size: xx-large">{{ this.articleTitle }}</h1>
    <quill-view
      [content]="articleContent"
      format="html"
      theme="snow"></quill-view>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class ArticlePostControllerComponent {
  @Input() articleContent: string = "";
  @Input() articleTitle: string = "";

  constructor() {}
}
