import { Component } from "@angular/core";
import { EditPostController } from "../../feature/edit/edit-post.controller";

@Component({
  standalone: true,
  imports: [EditPostController],
  template: `
    <div
      class="container"
      style="height: 100dvh;">
      <div class="row">
        <div class="col-12">
          <edit-post-controller></edit-post-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class AddPostView {
  constructor() {}
}
