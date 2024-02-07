import { Component } from "@angular/core";
import { EmailSignUpController } from "../../feature/login/email-signup.controller";
import {
  CarouselSliderComponent,
  ICarousel,
} from "../../shared/components/imagesCard/carousel-slider.component";

@Component({
  standalone: true,
  imports: [EmailSignUpController, CarouselSliderComponent],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <carousel-slider-component
            [images]="images"
            [isSilding]="true"></carousel-slider-component>
        </div>
      </div>
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
export default class SignUpView {
  public images: ICarousel.IImage = {
    type: ICarousel.IImageType.IMAGE,
    image: [
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fcorporate.gif?alt=media&token=e73702c5-824e-4f99-afb3-597aa25251c0",
    ],
  };
}
