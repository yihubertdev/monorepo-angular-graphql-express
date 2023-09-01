import { AfterViewInit, Component, Input } from "@angular/core";
@Component({
  selector: "carousel-slider-component",
  template: ` <div
      class="slide-show-container"
      [ngStyle]="{
        height: height + 'dvh'
      }"
      *ngIf="images?.length !== 0">
      <div
        class="slide fade"
        *ngFor="let image of images; let i = index"
        [ngStyle]="{
          'background-image': 'url(' + image + ')',
          display: i == slideIndex ? 'block' : 'none'
        }"
        [ngClass]="
          isCover ? 'slide-image-container' : 'slide-image-center'
        "></div>

      <a
        class="prev hide-slide"
        (click)="
          slideIndex - 1 < 0
            ? (slideIndex = images.length - 1)
            : (slideIndex = slideIndex - 1)
        "
        >❮</a
      >
      <a
        class="next hide-slide"
        (click)="
          slideIndex + 1 >= images.length
            ? (slideIndex = 0)
            : (slideIndex = slideIndex + 1)
        "
        >❯</a
      >
    </div>
    <br />

    <div style="text-align:center">
      <span
        class="dot"
        *ngFor="let image of images; let i = index"
        (click)="slideIndex = i"
        [ngClass]="i === slideIndex ? 'active' : ''"></span>
    </div>`,
  styleUrls: ["./carousel-slider.css"],
})
export class CarouselSliderComponent {
  @Input() images: string[] = [];
  @Input() height?: number;
  @Input() isCover: boolean = true;
  public slideIndex: number = 0;
}
