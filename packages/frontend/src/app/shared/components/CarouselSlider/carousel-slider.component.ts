import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { Lightbox, LightboxModule } from "ng-gallery/lightbox";
import { Gallery, GalleryModule, ImageItem } from "ng-gallery";
import { v4 as uuidv4 } from "uuid";

export namespace ICarousel {
  export const enum IImageType {
    IMAGE = "image",
    PREVIEW = "preview",
  }

  export interface IBasic {
    type: IImageType;
    image: string[];
  }

  export interface IImage extends IBasic {
    type: IImageType.IMAGE;
  }

  export interface IPreview extends IBasic {
    type: IImageType.PREVIEW;
    url: string;
    description: string;
    title: string;
  }
}

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
        [gallery]="galleryId">
        <hr />
        <a
          *ngIf="item?.data?.thumb"
          mat-stroked-button
          [href]="item?.data?.thumb"
          class="unset-tag-a"
          target="_blank"
          ><div class="gallery-image-text">
            <h4 class="text-overflow-title">{{ item.data.alt }}</h4>
            <p class="text-overflow-preview">{{ item.data.args }}</p>
          </div>
        </a>
      </div>

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
  @Input({ required: true }) images!: ICarousel.IImage | ICarousel.IPreview;
  @Input() isSilding?: boolean;

  @ViewChild("imageTem") imageTem: any;
  public slideIndex: number = 0;
  public galleryId: string = uuidv4();
  public galleryImages: ImageItem[] = [];

  constructor(
    public gallery: Gallery,
    private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    const galleryRef = this.gallery.ref(this.galleryId, {
      thumb: false,
      counterPosition: "top",
      dots: true,
      dotsSize: 10,
      dotsPosition: "bottom",
      imageSize: "cover",
    });
    this.galleryImages = this.images.image.map((card) => {
      if (this.images.type === ICarousel.IImageType.PREVIEW) {
        return new ImageItem({
          src: card,
          alt: (this.images as ICarousel.IPreview).title,
          args: (this.images as ICarousel.IPreview).description,
          thumb: (this.images as ICarousel.IPreview).url,
        });
      }
      return new ImageItem({
        src: card,
      });
    });
    this.lightbox.setConfig({
      panelClass: "fullscreen",
    });
    galleryRef.load(this.galleryImages);
    if (this.isSilding) {
      setInterval(() => {
        this.slideIndex =
          this.slideIndex + 1 >= this.galleryImages.length
            ? (this.slideIndex = 0)
            : (this.slideIndex = this.slideIndex + 1);
      }, 2000);
    }
  }
}
