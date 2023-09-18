import { Component } from "@angular/core";

@Component({
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <div class="row mb-4 justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <email-signup-controller></email-signup-controller>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <h3>
            Already have account?
            <a
              mat-tab-link
              routerLink="../login">
              Login</a
            >
          </h3>
        </div>
      </div>
    </div>`,
  styleUrls: ["../account.style.css"],
})
export class SignUpView {
  constructor() {}
}
