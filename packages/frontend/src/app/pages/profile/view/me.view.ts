import { Component } from "@angular/core";

@Component({
  template: `
    <div class="row justify-content-center m-0 p-0">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 m-0 p-0">
        <home-page-post-controller
          [isPagination]="true"
          [isUserProfile]="true"
          [isMe]="false"></home-page-post-controller>
      </div>
    </div>
  `,
  styleUrls: ["../profile.style.css"],
})
export class MeView {}
