import { Component, HostListener, Input, OnInit } from "@angular/core";
import { POST } from "sources";
import { PostFireStore } from "../../core/services/fireStore/blog.firestore";
import { PostCardComponent } from "../../shared/components/postCard/post-card.component";
import { NgIf } from "@angular/common";
import { CarouselSliderComponent } from "../../shared/components/imagesCard/carousel-slider.component";
import { JobsHorizonalScrollController } from "./jobs-horizonal-scroll.controller";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    NgIf,
    PostCardComponent,
    CarouselSliderComponent,
    JobsHorizonalScrollController,
  ],
  selector: "home-page-post-controller",
  template: `
    @for (post of data; track post.id) {
      <post-card-component
        [postCardInfo]="post"
        [isUserProfile]="!!userId"
        [isMe]="isMe"></post-card-component>
    }
  `,
  styleUrls: ["./home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  @Input({ required: true }) userId!: string;
  public images = [
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-ai.png?alt=media&token=53d51610-84be-45e6-bbe5-247859b470a7",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-financing.png?alt=media&token=fe3cee60-5d3f-4523-abf8-8b00e6893388",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-page-slide-social.png?alt=media&token=d769f3c7-f55a-438c-a97c-afd1841333d3",
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
  ];

  public data: POST.IPost[] = [];
  private hasFile: boolean = true;
  public isMe: boolean = false;

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
      const post = await this._PostService.listUserPaginationWithCache(
        5,
        this.userId
      );

      this.data = post.data;
      this.hasFile = post.hasFile;
    }
  }

  ngOnInit(): void {
    const resolverData = this.route.snapshot.data as {
      posts: {
        data: POST.IPost[];
        hasFile: boolean;
      };
    };
    if (this.userId == "me") {
      this.isMe = true;
      this.userId = this.route.parent?.parent?.snapshot.data["user"].userId;
    }
    if (this.data.length) return;
    this.hasFile = resolverData!.posts.hasFile;
    this.data = resolverData!.posts.data;
  }

  identify(index: number, post: POST.IPost) {
    return post.id;
  }
}
