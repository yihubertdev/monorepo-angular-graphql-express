import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IPost } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
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
  @Input() isPagination: boolean = false;
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
    private _authService: AuthService
  ) {}

  @HostListener("window:scroll", ["$event"])
  async onWindowScroll() {
    if (
      // Check scroll position at the bottom of the page
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.hasFile &&
      this.isPagination
    ) {
      const post = await this._PostService.listPagination(5, this.userId);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;
    if (this.userId === "me") {
      this._authService.userAuthObserver$.subscribe(() => {
        this.userId = this._authService.get()?.userId;
      });
    }
    const post = await this._PostService.list(5, this.userId);
    this.hasFile = post.hasFile;
    this.data = post.data;
  }

  identify(index: number, post: IPost) {
    return post.id;
  }
}
