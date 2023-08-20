import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IPost } from "types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <mat-card
      class="mb-2"
      style="maxWidth: 400px"
      *ngFor="let post of posts">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-subtitle>{{
            post.createdAt | date : "yyyy-MM-dd h:mm:ss a"
          }}</mat-card-subtitle>
        </mat-card-title-group>
      </mat-card-header>
      <img
        mat-card-image
        *ngIf="post.image"
        [src]="post.image" />
      <mat-card-content>
        <p
          class="text-overflow-card"
          [innerHTML]="post.content"></p
      ></mat-card-content>
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
}
