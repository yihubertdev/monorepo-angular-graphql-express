import { NgFor, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  imports: [MatCardModule, NgFor, NgStyle],
  selector: "image-slider-component",
  template: `
    <div class="horizonal-scroll-section">
      <mat-card
        class="horizonal-scroll-card slide-image-cover-center"
        *ngFor="let image of images"
        [ngStyle]="{
          backgroundImage: 'url(' + image + ')',
        }">
        <mat-card-content style="width: 300px; height: 300px;">
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class ImageSliderComponent {
  @Input({ required: true }) images?: string[];
}
