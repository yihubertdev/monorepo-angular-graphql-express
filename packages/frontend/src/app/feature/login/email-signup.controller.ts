import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { phoneVerifySchema, userSignUpSchema } from "../../core/joiSchema";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  User,
} from "@angular/fire/auth";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import {
  PHONE_VERIFY,
  USER_SIGNUP_FORM,
} from "src/app/core/static/form.static";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { SITE_ROUTE_PAGE } from "src/app/core/static/menu.static";

@Component({
  standalone: true,
  imports: [NgIf, FormInputListComponent, MatFormFieldModule, MatDialogModule],
  providers: [AuthService],
  selector: "email-signup-controller",
  template: ` <form-input-list-component
      [list]="list"
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
export class EmailSignUpController implements OnInit {
  public list = USER_SIGNUP_FORM;
  public schema = userSignUpSchema;
  public isLoading: boolean = false;
  private recaptcha!: RecaptchaVerifier;
  private token?: string;
  public hasError?: string;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.recaptcha = this.authService.buildRecaptcha("recaptcha-signup");
    this.recaptcha.render();
    this.recaptcha.verify().then((token) => (this.token = token));
  }

  async signup(formValue: Record<string, number | string | string[]>) {
    if (!this.token) {
      this.hasError = "Please verify";
      return;
    }

    this.isLoading = true;
    const { displayName, email, password, phone, area } = formValue as {
      displayName: string;
      email: string;
      password: string;
      phone: string;
      area: string;
    };

    const data = {
      displayName,
      email,
      password,
      phone: (area + phone).replace(/\s/g, ""),
    };
    try {
      const { user, confirmationResult } = await this.authService.register(
        data,
        this.recaptcha
      );

      const dialog = this.dialog.open(RegisterPhoneDialog, {
        disableClose: true,
        data: {
          user,
          verifier: this.recaptcha,
          confirm: confirmationResult,
        },
        height: "80%",
        width: "80%",
      });

      dialog.afterClosed().subscribe((verifyResult: string) => {
        if (!user.emailVerified) {
          this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
          throw new Error("email is not verified");
        }
        if (verifyResult) {
          this._router.navigate(SITE_ROUTE_PAGE.SETTINGS);
        }
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  }
}

@Component({
  standalone: true,
  imports: [NgIf, MatDialogModule, MatButtonModule, FormInputListComponent],
  template: `<h1 mat-dialog-title>Register Your Phone</h1>
    <div mat-dialog-content>
      <h1 mat-dialog-title>Register Your Phone</h1>
      <form-input-list-component
        [list]="list"
        [schema]="schema"
        buttonName="Register"
        (formValue)="verify($event)"
        [loading]="isLoading"></form-input-list-component>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        (click)="dialogRef.close()">
        CLOSE
      </button>
    </div>`,
  styleUrls: [],
})
export class RegisterPhoneDialog {
  public isLoading: boolean = false;
  public list = PHONE_VERIFY;
  public schema = phoneVerifySchema;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterPhoneDialog>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
      verifier: RecaptchaVerifier;
      confirm: ConfirmationResult;
    }
  ) {}

  async verify(value: Record<string, number | string | string[]>) {
    this.isLoading = true;
    const { verifyCode } = value as { verifyCode: string };
    const result = await this.authService.confirmPhone(
      verifyCode,
      this.data.confirm!
    );

    this.dialogRef.close(result);
  }
}
