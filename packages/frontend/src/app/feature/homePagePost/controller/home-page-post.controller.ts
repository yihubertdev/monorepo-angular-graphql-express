import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPost } from "blog";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <div
      [ngClass]="isPagination ? 'container-overflow-vertical' : ''"
      #postCardContainer
      (scroll)="onScroll($event)"
      [ngStyle]="{
        height: isPagination ? height + 'dvh' : ''
      }">
      <ng-container *ngFor="let post of data">
        <post-card-component
          [postCardInfo]="post"
          [isUserProfile]="isUserProfile"></post-card-component>
      </ng-container>
    </div>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  @Input() height: number = 90;
  @Input() isPagination: boolean = false;
  @Input() isUserProfile: boolean = false;
  @Output() isLoading = new EventEmitter<boolean>();

  public data: IPost[] = [];
  private hasFile: boolean = true;

  constructor(private _PostService: PostFireStore) {}

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;
    const post = await this._PostService.list(6);
    this.hasFile = post.hasFile;
    this.data = post.data;
    this.isLoading.emit(false);
  }

  async onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.hasFile &&
      this.isPagination
    ) {
      const post = await this._PostService.listPagination(5);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }
}
