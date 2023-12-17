import { Component, Input, OnInit } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { LightboxModule } from "ng-gallery/lightbox";
import { Gallery, GalleryModule, ImageItem } from "ng-gallery";
import { v4 as uuidv4 } from "uuid";

@Component({
  standalone: true,
  imports: [
    MatProgressBarModule,
    NgStyle,
    NgClass,
    NgIf,
    NgForOf,
    LightboxModule,
    GalleryModule,
  ],
  selector: "carousel-slider-component",
  template: `
    <div
      class="slide-show-container"
      [ngStyle]="{
        height: height + 'dvh'
      }"
      *ngIf="galleryImages?.length !== 0">
      <div
        class="slide fade slide-image-cover-center"
        *ngFor="let item of galleryImages; let i = index"
        [ngStyle]="{
          height: '100%',
          'background-image': 'url(' + item.data.src + ')',
          display: i === slideIndex ? 'block' : 'none'
        }"
        [lightbox]="i"
        [gallery]="galleryId"></div>

      <div class="position-absolute-center">
        <span
          class="dot"
          *ngFor="let item of galleryImages; let i = index"
          (click)="slideIndex = i"
          [ngClass]="i === slideIndex ? 'active' : ''"></span>
      </div>

      <a
        class="prev hide-slide"
        (click)="
          slideIndex - 1 < 0
            ? (slideIndex = galleryImages.length - 1)
            : (slideIndex = slideIndex - 1)
        "
        >❮</a
      >
      <a
        class="next hide-slide"
        (click)="
          slideIndex + 1 >= galleryImages.length
            ? (slideIndex = 0)
            : (slideIndex = slideIndex + 1)
        "
        >❯</a
      >
    </div>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class CarouselSliderComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() height?: number;
  @Input() isSilding?: boolean;
  public slideIndex: number = 0;
  public galleryId: string = uuidv4();
  public galleryImages: ImageItem[] = [];

  constructor(public gallery: Gallery) {}

  ngOnInit(): void {
    const galleryRef = this.gallery.ref(this.galleryId, {
      thumb: false,
      counterPosition: "top",
      dots: true,
      dotsSize: 10,
      dotsPosition: "bottom",
    });
    this.galleryImages = this.images.map((card) => {
      return new ImageItem({
        src: card,
        thumb: card,
      });
    });
    galleryRef.load(this.galleryImages);
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
