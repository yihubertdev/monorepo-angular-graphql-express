import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IPost } from "sources-types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <ng-container *ngFor="let post of data">
      <post-card-component
        [postCardInfo]="post"
        [isUserProfile]="isUserProfile"></post-card-component>
    </ng-container>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit, AfterViewInit {
  @Input() isPagination: boolean = false;
  @Input() isUserProfile: boolean = false;
  @Output() isLoading = new EventEmitter<boolean>();

  public data: IPost[] = [];
  private hasFile: boolean = true;

  constructor(private _PostService: PostFireStore) {}

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;
    const post = await this._PostService.list(7);
    this.hasFile = post.hasFile;
    this.data = post.data;
    this.isLoading.emit(false);
  }

  ngAfterViewInit(): void {
    (
      document.getElementById("matDrawerContentScroll") as HTMLElement
    ).addEventListener("scroll", async (scroll) => {
      const event = scroll.target as HTMLElement;

      if (
        event.offsetHeight + event.scrollTop >= event.scrollHeight &&
        this.hasFile &&
        this.isPagination
      ) {
        const post = await this._PostService.listPagination(7);
        this.data.push(...post.data);
        this.hasFile = post.hasFile;
      }
    });
  }
}
