import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IPost } from "types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <mat-card
      class="mb-2"
      *ngFor="let post of posts">
      <mat-card-header>
        <div
          mat-card-avatar
          [ngStyle]="{
            backgroundImage: 'url(' + (post.photoURL | UserPhotoPipe) + ')',
            backgroundSize: 'cover'
          }"></div>
        <mat-card-title>{{ post.displayName }}</mat-card-title>
        <mat-card-subtitle>{{
          post.createdAt | date : "yyyy-MM-dd h:mm:ss a"
        }}</mat-card-subtitle>
      </mat-card-header>

      <img
        mat-card-image
        *ngIf="post.image"
        [src]="post.image" />
      <mat-card-content>
        <p
          class="text-overflow-card"
          style="white-space: pre-wrap;"
          [innerHTML]="post.content"></p>

        <p
          class="clickable-pointer"
          (click)="showMore()"
          style="text-align: right;">
          Show More
        </p></mat-card-content
      >
    </mat-card>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  public posts?: IPost[];

  constructor(private _router: Router, private _PostService: PostFireStore) {}

  async ngOnInit(): Promise<void> {
    this.posts = await this._PostService.listPagination(5);
    console.log(this.posts);
  }

  public showMore() {
    console.log("show more");
  }
}
