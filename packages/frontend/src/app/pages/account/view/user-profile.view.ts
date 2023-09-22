import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <div class="row justify-content-center m-0 p-0 mb-2">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
          <user-profile-controller [userId]="userId"></user-profile-controller>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ["../account.style.css"],
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
