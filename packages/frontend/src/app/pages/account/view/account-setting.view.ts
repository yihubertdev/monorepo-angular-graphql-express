import { Component, OnInit } from "@angular/core";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div
      class="container max-width-container"
      style="max-width: 100% !important">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
          <user-profile-controller></user-profile-controller>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
          <home-page-post-controller
            [isPagination]="true"
            [isUserProfile]="true"
            [isMe]="true"></home-page-post-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../account.style.css"],
})
export class AccountViewComponent {
  panelOpenState = false;
}
