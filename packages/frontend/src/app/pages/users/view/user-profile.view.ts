import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <div class="row justify-content-center m-0 p-0 mb-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <user-profile-controller [userId]="userId"></user-profile-controller>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ["../user.style.css"],
})
export class UserProfileView implements OnInit {
  public userId?: string;
  constructor(private _router: Router) {}

  ngOnInit() {
    const id = this._router.url.split("/")[2];

    this.userId = id === "me" ? undefined : id;
  }
}
