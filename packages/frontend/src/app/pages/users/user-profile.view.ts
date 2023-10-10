import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterLinkWithHref, RouterOutlet } from "@angular/router";
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
    <div class="container">
      <div class="row justify-content-center m-0 p-0 mb-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <user-profile-controller></user-profile-controller>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: [],
})
export default class UserProfileView {}
