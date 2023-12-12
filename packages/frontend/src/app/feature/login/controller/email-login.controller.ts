import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { userLoginSchema } from "../../../core/joiSchema";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { USER_LOGIN_FORM } from "../../../core/static/form.static";
import { SITE_ROUTE_PAGE } from "../../../core/static/menu.static";
import { RecaptchaVerifier } from "@angular/fire/auth";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";

@Component({
  standalone: true,
  selector: "email-login-controller",
  imports: [NgIf, FormInputListComponent, MatFormFieldModule],
  template: `
    <form-input-list-component
      [list]="list"
      errorLocation="UserLoginFeature"
      [schema]="schema"
      buttonName="Login"
      (formValue)="login($event)"
      [loading]="isLoading"></form-input-list-component>
    <div
      class="mt-5"
      style="display:inline-block"
      id="recaptcha-signin"></div>
    <mat-error *ngIf="hasError"> {{ hasError }} </mat-error>
  `,
  styleUrls: [],
})
export class EmailLoginControllerComponent {
  public list = USER_LOGIN_FORM;
  public schema: any = userLoginSchema;
  public isLoading: boolean = false;
  public hasError?: string;
  private token?: string;
  private recaptcha!: RecaptchaVerifier;

  constructor(private _router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.recaptcha = new RecaptchaVerifier(
      "recaptcha-signup",
      // Optional reCAPTCHA parameters.
      {
        size: "normal",
        "expired-callback": () => {
          this.token = undefined;
        },
      },
      this.authService.getFireAuth()
    );
    this.recaptcha.render();
    this.recaptcha.verify().then((token) => (this.token = token));
  }

  async login(formValue: Record<string, number | string>) {
    if (!this.token) {
      this.hasError = "Please Verify Not A Robot Check ";
      return;
    }
    this.isLoading = true;
    const data = {
      email: String(formValue["email"]),
      password: String(formValue["password"]),
    };
    await this.authService.login(data);
    this._router.navigate(SITE_ROUTE_PAGE.SETTINGS);
    this.isLoading = false;
  }
}
