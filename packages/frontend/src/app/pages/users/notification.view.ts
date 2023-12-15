import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { EmailSignUpController } from "../../feature/login/email-signup.controller";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { UserProfileSignUpController } from "../../feature/userProfile/user-profile-sign-up.controller";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    EmailSignUpController,
    RouterOutlet,
    RouterLinkWithHref,
    UserProfileSignUpController,
  ],
  template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container">
      <h1>notification</h1>
    </div>`,
  styleUrls: [],
})
export default class NotificationView {}
