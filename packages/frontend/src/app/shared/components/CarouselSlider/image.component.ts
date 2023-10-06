import { Component, Input, OnInit } from "@angular/core";
import { NgStyle } from "@angular/common";
import { LightboxModule, Lightbox, IAlbum } from "ngx-lightbox";
import { lightBoxConfig } from "src/app/core/static/post.static";

@Component({
  standalone: true,
  imports: [NgStyle, LightboxModule],
  selector: "image-component",
  template: `
    <!--single image display-->
    <div
      class="image-frame-rounded slide-image-cover-center image-height-responsive"
      [ngStyle]="{
          backgroundImage: 'url(' + images[0] + ')',
        }"
      (click)="openImagePopup()"></div>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class ImageComponent implements OnInit {
  @Input({ required: true }) images: string[] = [];
  public slideIndex: number = 0;
  private _album: IAlbum[] = [];

  constructor(private _lightbox: Lightbox) {}

  ngOnInit(): void {
    this._album = this.images.map((image) => ({
      src: image,
      thumb: image,
      downloadUrl: image,
    }));
  }

  openImagePopup(): void {
    // open lightbox
    this._lightbox.open(this._album, 1, lightBoxConfig);
  }
}
