import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Lightbox, LightboxModule } from "ng-gallery/lightbox";
import { Gallery, GalleryItem, GalleryModule } from "ng-gallery";
import { v4 as uuidv4 } from "uuid";
import { NgIf, NgStyle } from "@angular/common";
import { POST } from "sources-types";

@Component({
  standalone: true,
  imports: [NgIf, LightboxModule, GalleryModule, NgStyle],
  selector: "gallery-component",
  template: `
    <gallery
      class="fix-height"
      [id]="galleryId"
      (itemClick)="open()"
      [thumb]="false"
      [dots]="true"
      [dotsSize]="10"
      dotsPosition="bottom">
      <ng-container *galleryImageDef="let item; let active = active">
        <a
          *ngIf="item?.thumb"
          class=" unset-tag-a"
          [href]="item?.thumb"
          target="_blank">
          <div class="gallery-image-text">
            <h5>{{ item?.args }}</h5>
            <p class="text-overflow-preview">{{ item?.alt }}</p>
          </div></a
        >
      </ng-container>
    </gallery>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class GalleryImageComponent implements OnInit {
  @Input({ required: true }) post!: POST.IImage | POST.IPreview;
  @ViewChild("customItem") templateImage: any;
  public galleryImages: GalleryItem[] = [];
  public galleryId: string = uuidv4();

  constructor(public gallery: Gallery, private lightbox: Lightbox) {}

  ngOnInit(): void {
    const galleryRef = this.gallery.ref(this.galleryId);
    this.galleryImages = this.post.image.map((item) => {
      if (this.post.type === POST.POST_TYPE.PREVIEW) {
        return {
          type: "image",
          data: {
            src: item,
            alt: this.post.description,
            thumb: this.post.url,
            args: this.post.title,
          },
        };
      }
      return {
        type: "image",
        data: {
          src: item,
        },
      };
    });
    galleryRef.load(this.galleryImages);
  }

  public open() {
    this.lightbox.open(0, this.galleryId);
  }
}
