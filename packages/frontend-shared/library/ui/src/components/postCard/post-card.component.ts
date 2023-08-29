import { Component, Input, OnInit } from "@angular/core";
import { IPost } from "library/types";

@Component({
  selector: "post-card-component",
  template: `
  <mat-card
  class="mb-2">
  <mat-card-header>
    <div
      mat-card-avatar
      [ngStyle]="{
        backgroundImage: 'url(' + (postCardInfo?.photoURL | UserPhotoPipe) + ')',
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
      style="white-space: pre-wrap;"
      [innerHTML]="postCardInfo?.content"></p>

    <p
      class="clickable-pointer"
      (click)="showMore()"
      style="text-align: right;">
      Show More
    </p></mat-card-content
  >
</mat-card>
`,
  styleUrls: ["./post-card.component.css"],
})
export class PostCardComponent {
  @Input() postCardInfo?:  IPost;

  showMore() {
    console.log(this.postCardInfo);
    console.log("show more");
  }
}
