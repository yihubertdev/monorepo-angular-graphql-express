import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { IPost } from "sources-types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <ng-container *ngFor="let post of data; trackBy: identify">
      <post-card-component
        [postCardInfo]="post"
        [isUserProfile]="!!userId"
        [isMe]="userId === 'me' ? true : false"></post-card-component>
    </ng-container>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  @Input() isPagination: boolean = false;
  @Input() userId?: string;
  @Output() isLoading = new EventEmitter<boolean>();
  @ViewChild("matDrawerContentScroll") matDrawerContent!: ElementRef;

  public data: IPost[] = [];
  private hasFile: boolean = true;

  constructor(private _PostService: PostFireStore) {}

  @HostListener("window:scroll", ["$event"])
  async onWindowScroll() {
    if (
      // Check scroll position at the bottom of the page
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.hasFile &&
      this.isPagination
    ) {
      const post = await this._PostService.listPagination(5);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;

    const post = await this._PostService.list(5);
    this.hasFile = post.hasFile;
    this.data = post.data;
    this.isLoading.emit(false);
  }

  identify(index: number, post: IPost) {
    return post.id;
  }
}
