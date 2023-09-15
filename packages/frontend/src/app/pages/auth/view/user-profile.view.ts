import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="responsive-post-section">
      <div class="container max-width-container">
        <div class="row justify-content-center m-0 p-0 mb-2">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
            <user-profile-controller
              [userId]="userId"></user-profile-controller>
          </div>
        </div>

        <div class="row justify-content-center m-0 p-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
            <home-page-post-controller
              [isPagination]="true"
              [height]="58"
              [isUserProfile]="true"></home-page-post-controller>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../auth.style.css"],
})
export class UserProfileView implements OnInit {
  public userId?: string;
  constructor(private _activatedRouter: ActivatedRoute) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe(
      (params: Params) => (this.userId = params["id"])
    );
  }
}
