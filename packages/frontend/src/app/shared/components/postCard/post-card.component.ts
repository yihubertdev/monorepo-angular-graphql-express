import { Component, Input } from "@angular/core";
import { IPost } from "types";

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
          }"></div>
        <mat-card-title>{{ postCardInfo?.displayName }}</mat-card-title>
        <mat-card-subtitle>{{
          postCardInfo?.createdAt | date : "yyyy-MM-dd h:mm:ss a"
        }}</mat-card-subtitle>
      </mat-card-header>

      <img
        mat-card-image
        *ngIf="postCardInfo?.image"
        [src]="postCardInfo?.image" />
      <mat-card-content>
        <p
          class="text-overflow-card"
          [ngStyle]="{ '-webkit-line-clamp': isShowMore ? 'none' : '4' }"
          [innerHTML]="postCardInfo?.content"></p>
        <p
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
export class PostCardComponent {
  @Input() postCardInfo?: IPost;

  public isShowMore: boolean = false;
}
