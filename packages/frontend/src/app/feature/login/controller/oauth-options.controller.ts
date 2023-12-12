import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { AuthService } from "src/app/core/services/fireAuth/auth";

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `<mat-nav-list>
    <a mat-list-item>
      <span mat-line>Sign In With Google</span>
    </a>

    <a mat-list-item>
      <span mat-line>Sign In With Guest</span>
    </a>
  </mat-nav-list>`,
})
export class OAuthOptionsComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<OAuthOptionsComponent>,
    private authService: AuthService
  ) {}

  // async signInWithGoogle(event: MouseEvent) {
  //   await this.authService.googleAuthSignIn();
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

  // async signInWithTwitter(event: MouseEvent) {
  //   await this.authService.twitterAuthSignIn();
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

  // async signInAnonymously(event: MouseEvent) {
  //   await this.authService.anonymousSignIn();
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
}
