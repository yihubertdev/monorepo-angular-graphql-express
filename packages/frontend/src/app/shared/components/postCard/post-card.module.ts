import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostCardComponent } from "./post-card.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { StringTransformPipeModule } from "angular-shared-ui";
import { CarouselSliderModule } from "../CarouselSlider/carousel-slider.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    StringTransformPipeModule,
    CarouselSliderModule,
  ],
  exports: [PostCardComponent],
})
export class PostCardModule {}
