import { Component } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { EmailLoginControllerComponent } from "../../feature/login/email-login.controller";
import { OAuthLoginControllerComponent } from "../../feature/login/oauth-login.controller";
import {
  CarouselSliderComponent,
  ICarousel,
} from "../../shared/components/CarouselSlider/carousel-slider.component";

@Component({
  standalone: true,
  imports: [
    RouterLinkWithHref,
    EmailLoginControllerComponent,
    OAuthLoginControllerComponent,
    CarouselSliderComponent,
  ],
  template: ` <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <carousel-slider-component
          [images]="images"
          [isSilding]="true"></carousel-slider-component>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
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
export default class LoginView {
  public images: ICarousel.IImage = {
    type: ICarousel.IImageType.IMAGE,
    image: [
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fcorporate.gif?alt=media&token=e73702c5-824e-4f99-afb3-597aa25251c0",
    ],
  };
}
