import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
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
          display: i === slideIndex ? 'block' : 'none'
        }"
        [ngClass]="
          isCover ? 'slide-image-cover-center' : 'slide-image-center'
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
export class CarouselSliderComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() height?: number;
  @Input() isCover: boolean = true;
  @Input() isSilding?: boolean;
  public slideIndex: number = 0;

  ngOnInit(): void {
    if (this.isSilding) {
      setInterval(() => {
        this.slideIndex =
          this.slideIndex + 1 >= this.images.length
            ? (this.slideIndex = 0)
            : (this.slideIndex = this.slideIndex + 1);
      }, 2000);
    }
  }
}
