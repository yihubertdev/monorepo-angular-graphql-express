import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { UserProfileController } from "../../feature/userProfile/user-profile.controller";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    UserProfileController,
    RouterOutlet,
    RouterLinkWithHref,
  ],
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div
      class="container-fluid"
      style="height: 90dvh;">
      <div class="row m-0 p-0 mb-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <h1>qweqweqwe</h1>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class UserProfileView {}
