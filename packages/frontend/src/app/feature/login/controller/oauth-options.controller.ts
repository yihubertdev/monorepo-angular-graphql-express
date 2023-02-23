import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/fireAuth/auth";

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `<mat-nav-list>
    <a mat-list-item (click)="signInWithGoogle($event)">
      <span mat-line>Google Account</span>
      <span mat-line>Sign In With Google</span>
    </a>

    <a mat-list-item (click)="signInAnonymously($event)">
      <span mat-line>Anonymous</span>
      <span mat-line>Sign In Anonymously</span>
    </a>
  </mat-nav-list>`,
})
export class OAuthOptionsComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<OAuthOptionsComponent>, private authService: AuthService) {}

  async signInWithGoogle(event: MouseEvent) {
    await this.authService.googleAuthSignIn();
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async signInWithTwitter(event: MouseEvent) {
    await this.authService.twitterAuthSignIn();
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async signInAnonymously(event: MouseEvent) {
    await this.authService.anonymousSignIn();
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
