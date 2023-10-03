import { NgFor, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  imports: [NgStyle, MatCardModule, NgFor],
  selector: "image-slider-component",
  template: `
    <div class="horizonal-scroll-section">
      <mat-card
        *ngFor="let image of images"
        class="horizonal-scroll-card slide-image-cover-center image-height-responsive"
        [ngStyle]="{
          backgroundImage: 'url('+image+')',
        }">
        <mat-card-content class="image-height-responsive"> </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class imageSliderComponent {
  @Input({ required: true }) images?: string[];
}
