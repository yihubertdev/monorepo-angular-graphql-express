import { Component } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UserProfileController } from "../../feature/userProfile/user-profile.controller";

@Component({
  standalone: true,
  imports: [UserProfileController, RouterOutlet],
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container-fluid">
      <div class="row m-0 p-0 mb-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <user-profile-controller
            [isSettingsPage]="
              route.children[0].routeConfig?.path === 'personal-profile'
            "></user-profile-controller>
        </div>
      </div>

      <div class="row m-0 p-0">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class UserProfileView {
  constructor(public route: ActivatedRoute) {}
}
