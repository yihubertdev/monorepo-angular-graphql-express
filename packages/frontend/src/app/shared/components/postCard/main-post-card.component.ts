import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { POST } from "sources-types";
import { NgIf, NgStyle, DatePipe, NgFor } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { UserPhotoPipe } from "../../pipes/default-photo.pipe";
import {
  CarouselSliderComponent,
  ICarousel,
} from "../CarouselSlider/carousel-slider.component";

@Component({
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgFor,
    MatCardModule,
    RouterModule,
    DatePipe,
    UserPhotoPipe,
    MatMenuModule,
    MatButtonModule,
    CarouselSliderComponent,
  ],
  selector: "main-post-card-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="m-1">
      <mat-card-header
        [routerLink]="['/users', 'profile', post.userId, 'posts']"
        class="cursor-pointer">
        <div
          mat-card-avatar
          class="m-0 pt-0"
          [ngStyle]="{
            backgroundImage: 'url(' + (post.photoURL | defaultUserPhoto) + ')',
            backgroundSize: 'cover'
          }"></div>
        <mat-card-title>{{ post.displayName }}</mat-card-title>
      </mat-card-header>

      <mat-card-content class="p-0">
        <p
          #content
          class="text-overflow-card-main m-2 mt-0 mb-0 pt-0"
          [innerHTML]="post.content"></p>
        <ng-container *ngIf="post.type === 'PREVIEW' || post.type === 'IMAGE'">
          <carousel-slider-component
            [images]="images"></carousel-slider-component>
        </ng-container>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class MainPostCardComponent implements OnInit {
  @Input({ required: true }) post!: POST.IPostFull;
  public images!: ICarousel.IImage | ICarousel.IPreview;

  ngOnInit() {
    this.images =
      this.post.type === POST.POST_TYPE.IMAGE
        ? {
            type: ICarousel.IImageType.IMAGE,
            image: this.post.image,
          }
        : {
            type: ICarousel.IImageType.PREVIEW,
            image: (this.post as POST.IPreview).image,
            url: (this.post as POST.IPreview).url,
            description: (this.post as POST.IPreview).description,
            title: (this.post as POST.IPreview).title,
          };
  }
}
