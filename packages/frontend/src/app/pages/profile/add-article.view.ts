import { Component } from "@angular/core";
import { EditArticleController } from "../../feature/edit/edit-article.controller";

@Component({
  standalone: true,
  imports: [EditArticleController],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <edit-article-controller></edit-article-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class AddArticleView {
  constructor() {}
}
