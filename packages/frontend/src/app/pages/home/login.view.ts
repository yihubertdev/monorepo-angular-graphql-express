import { Component } from "@angular/core";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { EmailLoginControllerComponent } from "../../feature/login/email-login.controller";
import { OAuthLoginControllerComponent } from "../../feature/login/oauth-login.controller";

@Component({
  standalone: true,
  imports: [
    RouterLinkWithHref,
    EmailLoginControllerComponent,
    OAuthLoginControllerComponent,
  ],
  template: ` <div
    class="container"
    style="height: 90dvh;">
    <div class="row mb-5 mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <h1>Sign in with email</h1>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <email-login-controller></email-login-controller>
      </div>
    </div>
    <div class="row mt-5 mb-5 justify-content-center">
      <div class="col-12">
        <oauth-login-controller></oauth-login-controller>
      </div>
    </div>
    <div class="row mb-5 mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <h3>
          No account?
          <a
            mat-tab-link
            routerLink="../signup">
            Register</a
          >
        </h3>
      </div>
    </div>
  </div>`,
})
export default class LoginView {}
