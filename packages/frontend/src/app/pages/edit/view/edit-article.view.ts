import { Component } from "@angular/core";

@Component({
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
  styleUrls: ["../edit.style.css"],
})
export class EditArticleView {
  constructor() {}
}
