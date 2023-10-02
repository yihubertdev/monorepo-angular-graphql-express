import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { EditArticleController } from "../../feature/edit/edit-article.controller";

@Component({
  standalone: true,
  imports: [CommonModule, EditArticleController],
  selector: "post-view",
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <edit-article-controller></edit-article-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class EditArticleView {
  constructor() {}
}
