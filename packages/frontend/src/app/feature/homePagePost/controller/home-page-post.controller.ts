import { Component, HostListener, Input, OnInit } from "@angular/core";
import { FIRESTORE_CACHE, IPost } from "sources-types";
import { PostFireStore } from "../../../core/services/fireStore/blog.firestore";
import { PostCardComponent } from "../../../shared/components/postCard/post-card.component";
import { NgFor, NgIf } from "@angular/common";
import { CarouselSliderComponent } from "../../../shared/components/CarouselSlider/carousel-slider.component";
import { JobsHorizonalScrollController } from "./jobs-horizonal-scroll.controller";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PostCardComponent,
    CarouselSliderComponent,
    JobsHorizonalScrollController,
  ],
  selector: "home-page-post-controller",
  template: `
    <ng-container *ngFor="let post of data; index as i; trackBy: identify">
      <post-card-component
        [postCardInfo]="post"
        [isUserProfile]="!!userId"
        [isMe]="userId === 'me' ? true : false"></post-card-component>

      <ng-container *ngIf="i === 3 && !userId">
        <carousel-slider-component
          [images]="images"
          [isSilding]="true"></carousel-slider-component>
      </ng-container>

      <ng-container *ngIf="i === 6 && !userId">
        <jobs-horizonal-scroll-controller></jobs-horizonal-scroll-controller>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  @Input() userId?: string;
  public images = [
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-ai.png?alt=media&token=53d51610-84be-45e6-bbe5-247859b470a7",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-financing.png?alt=media&token=fe3cee60-5d3f-4523-abf8-8b00e6893388",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-social.png?alt=media&token=d769f3c7-f55a-438c-a97c-afd1841333d3",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
  ];

  public data: IPost[] = [];
  private hasFile: boolean = true;

  constructor(
    private _PostService: PostFireStore,
    private route: ActivatedRoute
  ) {}

  @HostListener("window:scroll", ["$event"])
  async onWindowScroll() {
    if (
      // Check scroll position at the bottom of the page
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.hasFile
    ) {
      const post = await this._PostService.listPaginationWithCache(
        5,
        this.userId ? FIRESTORE_CACHE.USER_PAGE : FIRESTORE_CACHE.HOME_PAGE,
        this.userId
      );
      this.data = post.data;
      this.hasFile = post.hasFile;
    }
  }

  ngOnInit(): void {
    if (this.data.length) return;

    const resolverData = this.route.snapshot.data as {
      posts: {
        data: IPost[];
        hasFile: boolean;
      };
    };
    this.hasFile = resolverData!.posts.hasFile;
    this.data = resolverData!.posts.data;
  }

  identify(index: number, post: IPost) {
    return post.id;
  }
}
