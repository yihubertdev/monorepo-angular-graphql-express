import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { userSignUpSchema } from "../../../core/joiSchema";
import { IUserSignUpForm } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { RecaptchaVerifier } from "@angular/fire/auth";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import { USER_SIGNUP_FORM } from "src/app/core/static/form.static";

@Component({
  standalone: true,
  imports: [NgIf, FormInputListComponent, MatFormFieldModule],
  providers: [AuthService],
  selector: "email-signup-controller",
  template: ` <form-input-list-component
      [list]="list"
      errorLocation="EmailSignUpController"
      [schema]="schema"
      buttonName="SignUp"
      (formValue)="signup($event)"
      [loading]="isLoading"></form-input-list-component>
    <div
      class="mt-5"
      style="display:inline-block"
      id="recaptcha-signup"></div>
    <mat-error *ngIf="hasError"> {{ hasError }} </mat-error>`,
  styleUrls: [],
})
export class EmailSignUpController {
  public list = USER_SIGNUP_FORM;
  public schema = userSignUpSchema;
  public isLoading: boolean = false;
  private recaptcha!: RecaptchaVerifier;
  private token?: string;
  public hasError?: string;

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

  async signup(formValue: Record<string, number | string>) {
    if (!this.token) {
      this.hasError = "Please verify";
      return;
    }
    console.log(formValue);
    return;
    this.isLoading = true;
    const { displayName, email, password } =
      formValue as unknown as IUserSignUpForm;
    const data = {
      displayName,
      email,
      password,
    };

    await this.authService.register(data);
    this._router.navigate(["users", "profile-signup"]);
    this.isLoading = false;
  }
}
