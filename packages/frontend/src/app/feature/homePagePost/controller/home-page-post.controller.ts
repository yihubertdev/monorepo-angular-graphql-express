import { Component, Input, OnInit } from "@angular/core";
import { IPost } from "blog";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-post-controller",
  template: `
    <div
      [ngClass]="
        reload ? 'responsive-height-container container-overflow-vertical' : ''
      "
      #postCardContainer
      (scroll)="onScroll($event)">
      <ng-container *ngFor="let post of data">
        <post-card-component [postCardInfo]="post"></post-card-component>
      </ng-container>
    </div>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePagePostController implements OnInit {
  @Input() reload: boolean = false;

  public data: IPost[] = [];
  private hasFile: boolean = true;

  constructor(private _PostService: PostFireStore) {}

  async ngOnInit(): Promise<void> {
    const post = await this._PostService.listPagination(6, false);
    this.hasFile = post.hasFile;
    this.data = post.data;
  }

  async onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.hasFile
    ) {
      const post = await this._PostService.listPagination(5, this.reload);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }
}
