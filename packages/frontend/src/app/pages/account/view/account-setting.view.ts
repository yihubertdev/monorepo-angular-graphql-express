import { Component, OnInit } from "@angular/core";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="responsive-post-section">
      <div class="container max-width-container">
        <div class="row justify-content-center m-0 p-0 mb-2">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
            <user-profile-controller></user-profile-controller>
          </div>
        </div>

        <div class="row justify-content-center m-0 p-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
            <home-page-post-controller
              [isPagination]="true"
              [isUserProfile]="true"
              [isMe]="true"></home-page-post-controller>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../account.style.css"],
})
export class AccountViewComponent {
  panelOpenState = false;
}
