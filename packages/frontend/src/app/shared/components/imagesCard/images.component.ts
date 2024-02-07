import { Component, Input, OnInit } from "@angular/core";
import {
  NgFor,
  NgIf,
  NgStyle,
  SlicePipe,
  UpperCasePipe,
} from "@angular/common";
import { LightboxModule } from "ng-gallery/lightbox";
import { Gallery, GalleryModule, ImageItem } from "ng-gallery";
import { MatGridListModule } from "@angular/material/grid-list";
import { v4 as uuidv4 } from "uuid";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    LightboxModule,
    GalleryModule,
    MatGridListModule,
    SlicePipe,
    MatButtonModule,
    MatIconModule,
    UpperCasePipe,
  ],
  selector: "images-component",
  template: `
    <mat-grid-list
      [cols]="galleryImages.length > 1 ? 2 : 1"
      rowHeight="2:1"
      gutterSize="15px">
      <mat-grid-tile
        *ngFor="let item of galleryImages | slice: 0 : 3; let i = index"
        colspan="1"
        rowspan="1"
        [lightbox]="i"
        [gallery]="galleryId"
        class="image-frame-rounded slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: 'url(' + item.data.src + ')'
        }"></mat-grid-tile>
      <mat-grid-tile
        *ngIf="images.length > 2"
        colspan="1"
        rowspan="1"
        [lightbox]="1"
        [gallery]="galleryId">
        <a mat-button
          >{{ "View All" | uppercase }}
          <mat-icon>more_horiz</mat-icon>
        </a></mat-grid-tile
      >
    </mat-grid-list>
  `,
  styleUrls: ["./carousel-slider.css"],
})
export class ImagesComponent implements OnInit {
  @Input({ required: true }) images!: string[];
  public galleryImages: ImageItem[] = [];
  public galleryId: string = uuidv4();

  constructor(public gallery: Gallery) {}

  ngOnInit(): void {
    const galleryRef = this.gallery.ref(this.galleryId, {
      thumb: false,
      counterPosition: "top",
    });
    this.galleryImages = this.images.map((card) => {
      return new ImageItem({
        src: card,
        thumb: card,
      });
    });
    galleryRef.load(this.galleryImages);
  }
}
