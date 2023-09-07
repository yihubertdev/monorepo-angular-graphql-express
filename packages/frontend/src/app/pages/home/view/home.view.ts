import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { isEmpty } from "lodash";
import { IUser } from "src/app/core/models/users.type";
import { IPostList } from "src/app/core/models/view.types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { postList } from "src/app/core/static/post.static";

@Component({
  selector: "post-view",
  template: `
    <!-- <ng-container>
      <mat-spinner></mat-spinner>
    </ng-container> -->
    <!-- router container 90dvh -->
    <div class="responsive-post-section">
      <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
      <div
        class="container responsive-height-container max-width-container container-overflow-vertical">
        <div class="row mb-2">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <carousel-slider-component
              [images]="images"></carousel-slider-component>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <a
              mat-button
              routerLink="posts"
              style="font-size: 25px">
              User Star
            </a>
            <jobs-horizonal-scroll-controller></jobs-horizonal-scroll-controller>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <a
              mat-button
              routerLink="posts"
              style="font-size: 25px">
              Fantastic Story Teller
            </a>
            <home-page-post-controller></home-page-post-controller>
            <a
              mat-raised-button
              color="primary"
              routerLink="posts"
              style="width: 100%;">
              Go To Post
            </a>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <a
              mat-button
              routerLink="posts"
              style="font-size: 25px">
              Professional Article
            </a>
            <home-page-article-controller></home-page-article-controller>
            <a
              mat-raised-button
              color="primary"
              routerLink="articles"
              style="width: 100%;">
              Go To Article
            </a>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <a
              mat-button
              routerLink="posts"
              style="font-size: 25px">
              Podcast & LiveStream
            </a>
            <jobs-horizonal-scroll-controller></jobs-horizonal-scroll-controller>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <a
              mat-button
              routerLink="posts"
              style="font-size: 25px">
              Announcement
            </a>
            <chat-topic-post-controller></chat-topic-post-controller>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class HomeViewComponent {
  postList: IPostList[];
  images = [
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
    "https://material.angular.io/assets/img/examples/shiba2.jpg",
  ];
  public isDisplay: boolean = false;
  private userAuthObserver$?: Observable<IUser | null>;

  constructor(private authService: AuthService) {
    this.postList = postList;
  }

  ngOnInit() {
    this.userAuthObserver$ = this.authService.userAuthObserver$;
    this.userAuthObserver$
      .pipe(
        map((user) => {
          if (!user) {
            return;
          }
          return {
            id: user.id,
            role: user.role,
          };
        })
      )
      .subscribe({
        next: (user) => {
          if (!user || isEmpty(user.id)) {
            this.isDisplay = false;
            return;
          }

          this.isDisplay = !this.authService.isVisitor(user.role);
        },
      });
  }
}
