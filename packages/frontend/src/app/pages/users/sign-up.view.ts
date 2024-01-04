import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { EmailSignUpController } from "../../feature/login/email-signup.controller";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [EmailSignUpController],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div
      class="container"
      style="height: 90dvh;">
      <div class="row mb-5 mt-5 justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <h1>Sign up with email</h1>
        </div>
      </div>
      <div class="row mb-5 justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <email-signup-controller></email-signup-controller>
        </div>
      </div>
    </div>`,
})
export default class SignUpView {}
