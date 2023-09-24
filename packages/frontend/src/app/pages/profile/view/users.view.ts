import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  template: `
    <div class="row justify-content-center m-0 p-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
        <home-page-post-controller
          [isPagination]="true"
          [isUserProfile]="true"
          [isMe]="false"></home-page-post-controller>
      </div>
    </div>
  `,
  styleUrls: ["../profile.style.css"],
})
export class UsersView implements OnInit {
  public userId?: string;
  constructor(private _activatedRouter: ActivatedRoute) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe((params: Params) => {
      console.log(params["id"]);
      this.userId = params["id"];
    });
  }
}
