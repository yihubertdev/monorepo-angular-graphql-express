import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { UserProfileController } from "../../feature/userProfile/user-profile.controller";
import { UserProfileSettingsController } from "../../feature/userProfile/user-profile-settings.controller";

@Component({
  standalone: true,
  imports: [UserProfileController, RouterOutlet, UserProfileSettingsController],
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <user-profile-controller
            [isSettingsPage]="true"></user-profile-controller>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-sm-12 mt-3">
          <user-profile-settings-controller></user-profile-settings-controller>
        </div>

        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-sm-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class UserSettingsView {}
