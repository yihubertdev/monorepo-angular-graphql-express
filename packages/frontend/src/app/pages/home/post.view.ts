import { Component } from "@angular/core";
import { HomePagePostController } from "../../feature/homePagePost/home-page-post.controller";
import { AddTextEditorController } from "../../feature/addTextEditor/add-text-editor.controller";

@Component({
  standalone: true,
  imports: [AddTextEditorController, HomePagePostController],
  template: `
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <div class="container">
      <!--justify-content-center center the inner col-->
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <home-page-post-controller></home-page-post-controller>
        </div>
      </div>

      <div class="fab-button icon-display">
        <add-text-editor-controller></add-text-editor-controller>
      </div>
    </div>
  `,
  styleUrls: ["./home.style.css"],
})
export default class PostView {}
