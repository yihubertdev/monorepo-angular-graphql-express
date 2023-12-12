import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { EmailSignUpController } from "../../feature/login/controller/email-signup.controller";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    EmailSignUpController,
    RouterOutlet,
    RouterLinkWithHref,
  ],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <h1>Sign up with email</h1>
          <h4>Enter the email address associated with your account</h4>
        </div>
      </div>
      <div class="row mb-5 justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <email-signup-controller></email-signup-controller>
        </div>
      </div>
    </div>`,
  styleUrls: [],
})
export default class SignUpView {
  constructor() {}
}
