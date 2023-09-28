import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostCardComponent } from "./post-card.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { StringTransformPipeModule } from "angular-shared-ui";
import { CarouselSliderModule } from "../CarouselSlider/carousel-slider.module";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { LinkPreviewPipe } from "../../directives/convertLinkPreview.pipe";
import { PreviewLinkComponent } from "./previewlink.component";

@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    StringTransformPipeModule,
    CarouselSliderModule,
    MatMenuModule,
    MatButtonModule,
    LinkPreviewPipe,
    PreviewLinkComponent,
  ],
  exports: [PostCardComponent],
})
export class PostCardModule {}
