import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { IPost } from "sources-types";
import { postCardMenu } from "../../../core/static/post.static";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";
import { Router } from "@angular/router";

@Component({
  selector: "post-card-component",
  template: `
    <mat-card class="mb-2">
      <mat-card-header (click)="(redirect)">
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
        <button
          mat-icon-button
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu"
          style="margin-left: auto;"
          *ngIf="isUserProfile">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button
            mat-menu-item
            *ngFor="let post of postCardMenu"
            (click)="submit(post.link)">
            <mat-icon>{{ post.iconName }}</mat-icon>
            <span>{{ post.description }}</span>
          </button>
        </mat-menu>
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
export class PostCardComponent {
  @Input() postCardInfo?: IPost;
  @Input() isUserProfile: boolean = false;
  @ViewChild("content", { static: true }) input?: ElementRef;

  public postCardMenu = postCardMenu;
  public isShowMore: boolean = false;
  constructor(private _PostService: PostFireStore, private _router: Router) {}
  redirect() {
    if (!this.isUserProfile) {
      this._router.navigate(["/account", "users", this.postCardInfo?.userId]);
    }
  }
  submit(link: string) {
    switch (link) {
      case "delete": {
        if (this.postCardInfo) {
          this._PostService.delete(this.postCardInfo.id);
        }

        break;
      }
      case "pin": {
        if (this.postCardInfo) {
          this._PostService.update({
            pin: true,
            id: this.postCardInfo.id,
          });
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
}
