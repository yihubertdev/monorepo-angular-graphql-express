import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IPostList } from "type-sources";
import { postList } from "../../core/static/post.static";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "post-view",
  template: ` <div>payment</div> `,
  styleUrls: [],
})
export default class PaymentView {
  postList: IPostList[];

  constructor() {
    this.postList = postList;
  }
}
