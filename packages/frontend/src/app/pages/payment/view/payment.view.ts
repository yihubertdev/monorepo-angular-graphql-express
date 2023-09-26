import { Component } from "@angular/core";
import { IPostList } from "sources-types";
import { postList } from "src/app/core/static/post.static";

@Component({
  selector: "post-view",
  template: ` <div>payment</div> `,
  styleUrls: [],
})
export class PaymentViewComponent {
  postList: IPostList[];

  constructor() {
    this.postList = postList;
  }
}
