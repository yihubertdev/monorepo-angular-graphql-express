import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  phoneRegisterSchema,
  phoneVerifySchema,
  userLoginSchema,
} from "../../core/joiSchema";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import {
  PHONE_REGISTER,
  PHONE_VERIFY,
  USER_LOGIN_FORM,
} from "../../core/static/form.static";
import { SITE_ROUTE_PAGE } from "../../core/static/menu.static";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  User,
} from "@angular/fire/auth";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "email-login-controller",
  imports: [NgIf, FormInputListComponent, MatFormFieldModule, MatDialogModule],
  template: `
    <form-input-list-component
      [list]="list"
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
  private recaptcha!: RecaptchaVerifier;
  public token!: string;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.recaptcha = this.authService.buildRecaptcha("recaptcha-signin");
    this.recaptcha.render();
    this.recaptcha.verify().then((token) => (this.token = token));
  }

  async login(formValue: Record<string, number | string | string[]>) {
    if (!this.token) {
      this.hasError = "Please Verify Not A Robot Check ";
      return;
    }
    this.isLoading = true;
    const data = {
      email: String(formValue["email"]),
      password: String(formValue["password"]),
    };
    const user = await this.authService.login(data);
    if (!user.phoneNumber) {
      return this.dialog.open(RegisterPhoneDialog, {
        disableClose: true,
        data: {
          user,
          verifier: this.recaptcha,
        },
        height: "80%",
        width: "80%",
      });
    }
    this.isLoading = false;
    return this._router.navigate(SITE_ROUTE_PAGE.SETTINGS);
  }
}

@Component({
  standalone: true,
  imports: [NgIf, MatDialogModule, MatButtonModule, FormInputListComponent],
  template: `<h1 mat-dialog-title>Register Your Phone</h1>
    <div mat-dialog-content>
      <h1 mat-dialog-title>Register Your Phone</h1>
      <ng-container *ngIf="!confirm">
        <form-input-list-component
          [list]="registerList"
          [schema]="registerSchema"
          buttonName="Send SMS"
          (formValue)="send($event)"
          [loading]="isLoading"></form-input-list-component>
      </ng-container>
      <ng-container *ngIf="confirm">
        <form-input-list-component
          [list]="list"
          [schema]="schema"
          buttonName="Register"
          (formValue)="verify($event)"
          [loading]="isLoading"></form-input-list-component>
      </ng-container>
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
  public registerList = PHONE_REGISTER;
  public registerSchema = phoneRegisterSchema;
  public list = PHONE_VERIFY;
  public schema = phoneVerifySchema;
  public confirm?: ConfirmationResult;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterPhoneDialog>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
      verifier: RecaptchaVerifier;
    }
  ) {}

  async send(value: Record<string, number | string | string[]>) {
    const { area, phone } = value as { area: string; phone: string };
    this.confirm = await this.authService.linkWithPhone(
      this.data.user,
      (area + phone).replace(/\s/g, ""),
      this.data.verifier
    );
  }

  async verify(value: Record<string, number | string | string[]>) {
    const { verifyCode } = value as { verifyCode: string };
    await this.authService.confirmPhone(verifyCode, this.confirm!);
    this._router.navigate(SITE_ROUTE_PAGE.SETTINGS);
  }
}
