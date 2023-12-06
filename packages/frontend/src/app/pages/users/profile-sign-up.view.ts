import { Component } from "@angular/core";
import { UserProfileSignUpController } from "../../feature/userProfile/user-profile-sign-up.controller";

@Component({
  standalone: true,
  imports: [UserProfileSignUpController],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div
          class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <user-profile-sign-up-controller></user-profile-sign-up-controller>
        </div>
      </div>
    </div>`,
  styleUrls: [],
})
export default class ProfileSignUpView {
  constructor() {}
}
