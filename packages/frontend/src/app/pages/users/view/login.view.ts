import { Component } from "@angular/core";

@Component({
  template: ` <div class="container">
    <div class="row mb-5 mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <h1>Sign in with email</h1>
      </div>
    </div>
    <div class="row mb-5 mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <h4>Enter the email address associated with your account</h4>
      </div>
    </div>
    <div class="row mb-5 mt-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <email-login-controller></email-login-controller>
      </div>
    </div>
    <div class="row mb-5 mt-5 pt-5 pb-5 justify-content-center">
      <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <oauth-login-controller></oauth-login-controller>
      </div>
    </div>
    <div class="row mb-5 mt-5 pt-5 justify-content-center">
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
  styleUrls: ["../user.style.css"],
})
export class LoginView {
  constructor() {}
}
