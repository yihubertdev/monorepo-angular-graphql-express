import { Component } from "@angular/core";
import { UserProfileSignUpController } from "../../feature/userProfile/user-profile-sign-up.controller";

@Component({
  standalone: true,
  imports: [UserProfileSignUpController],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container-fluid">
      <!-- justify-content-center put col into center if less than 12 col  -->
      <div class="row justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <user-profile-sign-up-controller></user-profile-sign-up-controller>
        </div>
      </div>
    </div>`,
  styleUrls: [],
})
export default class ProfileSignUpView {
  constructor() {}
}
