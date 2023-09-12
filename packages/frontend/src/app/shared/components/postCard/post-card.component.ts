import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { IPost } from "blog";

@Component({
  selector: "post-card-component",
  template: `
    <mat-card class="mb-2">
      <mat-card-header>
        <div
          mat-card-avatar
          [ngStyle]="{
            backgroundImage:
              'url(' + (postCardInfo?.photoURL | UserPhotoPipe) + ')',
            backgroundSize: 'cover'
          }"
          *ngIf="!isUserProfile"></div>
        <mat-card-title *ngIf="!isUserProfile">{{
          postCardInfo?.displayName ? postCardInfo?.displayName : "Guest"
        }}</mat-card-title>
        <mat-card-subtitle>{{
          postCardInfo?.createdAt | date : "yyyy-MM-dd h:mm:ss a"
        }}</mat-card-subtitle>
      </mat-card-header>

      <div
        *ngIf="postCardInfo?.image?.length === 1"
        class="image-frame-rounded slide-image-cover-center image-height-responsive"
        [ngStyle]="{
          backgroundImage: 'url(' + postCardInfo?.image + ')',
        }"></div>

      <carousel-slider-component
        *ngIf="postCardInfo?.image && postCardInfo?.image?.length !== 1"
        [images]="postCardInfo?.image ?? []"
        [height]="20"
        [isCover]="false"></carousel-slider-component>

      <mat-card-content>
        <p
          #content
          class="text-overflow-card"
          [ngStyle]="{ display: isShowMore ? 'block' : '-webkit-box' }"
          [innerHTML]="postCardInfo?.content"></p>
        <p
          *ngIf="content.scrollHeight > 100"
          class="clickable-pointer"
          (click)="isShowMore = !isShowMore"
          style="text-align: right;">
          {{ isShowMore ? "Show Less" : "Show More" }}
        </p></mat-card-content
      >
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class PostCardComponent implements AfterViewInit {
  @Input() postCardInfo?: IPost;
  @Input() isUserProfile: boolean = false;
  @ViewChild("content", { static: true }) input?: ElementRef;

  public isShowMore: boolean = false;

  ngAfterViewInit(): void {}
}
