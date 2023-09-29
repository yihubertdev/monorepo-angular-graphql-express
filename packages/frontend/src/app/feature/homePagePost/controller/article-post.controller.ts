import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "article-post-controller",
  template: `
    <h1 style="font-size: xx-large; text-align: center;">
      {{ this.articleTitle }}
    </h1>
    <quill-view
      [content]="articleContent"
      format="html"
      theme="snow"></quill-view>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class ArticlePostControllerComponent implements OnInit {
  @Input() articleContent: string = "";
  @Input() articleTitle: string = "";

  constructor() {}

  ngOnInit(): void {
    console.log(this.articleContent);
  }
}
