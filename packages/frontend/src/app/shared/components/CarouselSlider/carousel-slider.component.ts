import { Component, Input, OnInit } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { LightboxModule, Lightbox, IAlbum } from "ngx-lightbox";
import { lightBoxConfig } from "src/app/core/static/post.static";

@Component({
  standalone: true,
  imports: [
    MatProgressBarModule,
    NgStyle,
    NgClass,
    NgIf,
    NgForOf,
    LightboxModule,
  ],
  selector: "carousel-slider-component",
  template: `
    <div
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
        [ngClass]="isCover ? 'slide-image-cover-center' : 'slide-image-center'"
        (click)="openImagePopup(i)"></div>

      <div class="position-absolute-center">
        <span
          class="dot"
          *ngFor="let image of images; let i = index"
          (click)="slideIndex = i"
          [ngClass]="i === slideIndex ? 'active' : ''"></span>
      </div>

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
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class CarouselSliderComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() height?: number;
  @Input() isCover: boolean = true;
  @Input() isSilding?: boolean;
  public slideIndex: number = 0;
  private _album: IAlbum[] = [];

  constructor(private _lightbox: Lightbox) {}

  ngOnInit(): void {
    this._album = this.images.map((image) => ({
      src: image,
      thumb: image,
      downloadUrl: image,
    }));
    if (this.isSilding) {
      setInterval(() => {
        this.slideIndex =
          this.slideIndex + 1 >= this.images.length
            ? (this.slideIndex = 0)
            : (this.slideIndex = this.slideIndex + 1);
      }, 2000);
    }
  }

  openImagePopup(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index, lightBoxConfig);
  }
}
