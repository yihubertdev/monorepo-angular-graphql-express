import { Component } from "@angular/core";
import { MainPostController } from "../../feature/homePagePost/main-post.controller";
import { AddTextEditorController } from "../../feature/addTextEditor/add-text-editor.controller";

@Component({
  standalone: true,
  imports: [AddTextEditorController, MainPostController],
  template: `
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <div class="container">
      <main-post-controller></main-post-controller>

      <div class="fab-button icon-display">
        <add-text-editor-controller></add-text-editor-controller>
      </div>
    </div>
  `,
  styleUrls: ["./home.style.css"],
})
export default class PostView {}
