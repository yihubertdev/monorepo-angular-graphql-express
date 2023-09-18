import { Component } from "@angular/core";
import { IPostList } from "sources-types";
import { postList } from "src/app/core/static/post.static";

@Component({
  selector: "post-view",
  template: ` <div style="width: 100vw; height: 90dvh">Search</div> `,
  styleUrls: ["./search.view.css"],
})
export class SearchViewComponent {
  postList: IPostList[];

  constructor() {
    this.postList = postList;
  }
}
