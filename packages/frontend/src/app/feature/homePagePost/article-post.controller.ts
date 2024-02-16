import { Component, Input } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { IArticle } from "sources";

@Component({
  standalone: true,
  imports: [QuillModule],
  selector: "article-post-controller",
  template: `
    <h1 style="font-size: xx-large; text-align: center;">
      {{ article?.title }}
    </h1>
    <quill-view
      [content]="article?.content"
      format="html"
      theme="snow"></quill-view>
  `,
  styleUrls: ["./home-page-post.style.css"],
})
export class ArticlePostControllerComponent {
  @Input() article?: IArticle;

  constructor() {}
}
