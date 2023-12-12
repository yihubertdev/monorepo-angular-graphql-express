import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { IFormInput } from "sources-types";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { OAuthOptionsComponent } from "./oauth-options.controller";
import { USER_LOGIN_FORM } from "src/app/core/static/form.static";
import { userLoginSchema } from "src/app/core/joiSchema";

const googleLogoURL = "/assets/images/Google.svg";

@Component({
  selector: "oauth-login-controller",
  template: ` <button
    mat-raised-button
    style="padding: 1rem;"
    (click)="openOAuthOptions()">
    <mat-icon>person</mat-icon> Choose OAuth Options
  </button>`,
  styleUrls: ["../login.style.css"],
})
export class OAuthLoginControllerComponent implements OnInit {
  formInputList: IFormInput[] = USER_LOGIN_FORM;
  validatorSchema: any = userLoginSchema;
  error: string = "";
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _bottomSheet: MatBottomSheet
  ) {}
  ngOnInit(): void {
    this.matIconRegistry.addSvgIconLiteral(
      "googleIcon",
      this.domSanitizer.bypassSecurityTrustHtml(googleLogoURL)
    );
  }

  openOAuthOptions() {
    this._bottomSheet.open(OAuthOptionsComponent);
  }
}
