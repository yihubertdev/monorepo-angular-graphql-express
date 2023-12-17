import { Component, HostListener, Input, OnInit } from "@angular/core";
import { POST, IUser } from "sources-types";
import { PostFireStore } from "../../core/services/fireStore/blog.firestore";
import { MainPostCardComponent } from "../../shared/components/postCard/main-post-card.component";
import { NgFor, NgIf } from "@angular/common";
import {
  CarouselSliderComponent,
  ICarousel,
} from "../../shared/components/CarouselSlider/carousel-slider.component";
import { JobsHorizonalScrollController } from "./jobs-horizonal-scroll.controller";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MainPostCardComponent,
    CarouselSliderComponent,
    JobsHorizonalScrollController,
  ],
  selector: "main-post-controller",
  template: `
    <div class="row">
      <ng-container *ngFor="let post of data; index as i; trackBy: identify">
        <div class="col-6 p-0">
          <main-post-card-component [post]="post"></main-post-card-component>
        </div>

        <div
          class="col-12 p-0"
          *ngIf="i === 3 && !userId">
          <carousel-slider-component
            [images]="images"
            [isSilding]="true"></carousel-slider-component>
        </div>

        <div
          class="col-12 p-0"
          *ngIf="i === 7 && !userId">
          <jobs-horizonal-scroll-controller></jobs-horizonal-scroll-controller>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ["./home-page-post.style.css"],
})
export class MainPostController implements OnInit {
  @Input() userId?: string;
  public images: ICarousel.IImage = {
    type: ICarousel.IImageType.IMAGE,
    image: [
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-ai.png?alt=media&token=53d51610-84be-45e6-bbe5-247859b470a7",
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-financing.png?alt=media&token=fe3cee60-5d3f-4523-abf8-8b00e6893388",
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-social.png?alt=media&token=d769f3c7-f55a-438c-a97c-afd1841333d3",
      "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
    ],
  };

  public data: POST.IPostFull[] = [];
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
      const post = await this._PostService.listHomePaginationWithCache(5);
      this.data = post.data;
      this.hasFile = post.hasFile;
    }
  }

  ngOnInit(): void {
    const resolverData = this.route.snapshot.data as {
      posts: {
        data: POST.IPostFull[];
        hasFile: boolean;
      };
      user: IUser;
    };

    if (this.data.length) return;
    this.hasFile = resolverData!.posts.hasFile;
    this.data = resolverData!.posts.data;
  }

  identify(index: number, post: POST.IPost) {
    return post.id;
  }
}
