import { Component } from "@angular/core";

@Component({
  selector: "edit-blog-view",
  template: `
    <div
      class="container"
      style="height: 100dvh">
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <edit-po-controller></edit-po-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../edit.style.css"],
})
export class EditBlogViewComponent {
  constructor() {}
}
