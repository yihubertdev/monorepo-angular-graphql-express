import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IPost } from "types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <ng-container *ngFor="let post of posts">
      <post-card-component (postCardInfo)="(post)"></post-card-component>
    </ng-container>
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
