import { Component } from "@angular/core";
import { MainPostController } from "../../feature/homePagePost/main-post.controller";

@Component({
  standalone: true,
  imports: [MainPostController],
  template: `
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <div class="container">
      <main-post-controller></main-post-controller>
    </div>
  `,
  styleUrls: ["./home.style.css"],
})
export default class PostView {}
