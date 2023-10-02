import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { EditPostController } from "../../feature/edit/edit-post.controller";

@Component({
  standalone: true,
  imports: [CommonModule, EditPostController],
  selector: "edit-blog-view",
  template: `
    <div
      class="container"
      style="height: 100dvh">
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <edit-post-controller></edit-post-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class EditBlogViewComponent {
  constructor() {}
}
