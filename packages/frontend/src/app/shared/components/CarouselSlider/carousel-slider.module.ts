import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FireStorageServiceModule } from "src/app/core/services/fireStorage/fire-storage.module";
import { CarouselSliderComponent } from "./carousel-slider.component";

@NgModule({
  declarations: [CarouselSliderComponent],
  imports: [CommonModule, MatProgressBarModule, FireStorageServiceModule],
  exports: [CarouselSliderComponent],
})
export class CarouselSliderModule {}
