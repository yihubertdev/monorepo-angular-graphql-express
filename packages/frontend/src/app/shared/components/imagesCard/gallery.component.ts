import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Lightbox, LightboxModule } from "ng-gallery/lightbox";
import { Gallery, GalleryItem, GalleryModule } from "ng-gallery";
import { v4 as uuidv4 } from "uuid";
import { NgIf, NgStyle } from "@angular/common";
import { POST } from "type-sources";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [
    NgIf,
    LightboxModule,
    GalleryModule,
    NgStyle,
    MatIconModule,
    MatButtonModule,
  ],
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
        <div
          class="gallery-image-text"
          *ngIf="item?.thumb">
          <a
            mat-stroked-button
            [href]="item?.thumb"
            target="_blank">
            <h4 class="text-overflow-title">{{ item?.args }}...</h4>
            <mat-icon>arrow_right_alt</mat-icon>
          </a>
          <p class="text-overflow-preview">{{ item?.alt }}</p>
        </div>
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

  constructor(
    public gallery: Gallery,
    private lightbox: Lightbox
  ) {}

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
            args: this.post.title.substring(0, 30),
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

  open() {
    this.lightbox.open(0, this.galleryId);
  }
}
