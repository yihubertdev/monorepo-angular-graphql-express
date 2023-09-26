import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/fireAuth/auth";

@Component({
  selector: "post-view",
  template: `
    <!-- container responsive-height-container -->
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <div class="container">
      <!--justify-content-center center the inner col-->
      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
          <home-page-post-controller
            [isPagination]="true"
            [isUserProfile]="false"
            [isMe]="false"></home-page-post-controller>
        </div>
      </div>

      <div
        class="fab-button icon-display"
        *ngIf="hasUser">
        <add-text-editor-controller></add-text-editor-controller>
      </div>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class PostViewComponent {
  public hasUser?: boolean;
  constructor(private _authService: AuthService) {
    this._authService.userAuthObserver$.subscribe((user) => {
      this.hasUser = Boolean(user);
    });
  }
}
