import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { userSignUpSchema } from "src/app/core/joiSchema/user-login.schema";
import {
  IUserSignUpForm,
  IFormInput,
  SNACKBAR_ERROR,
  SNACKBAR_ACTION,
} from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { userSignUpFormList } from "src/app/core/static/auth.static";
import { CommonModule } from "@angular/common";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkWithHref,
    FormInputListComponent,
  ],
  providers: [AuthService],
  selector: "email-signup-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EmailSignUpController"
    [validatorSchema]="validatorSchema"
    buttonName="SignUp"
    (formValue)="signup($event)"></form-input-list-component>`,
  styleUrls: [],
})
export class EmailSignUpController {
  formInputList: IFormInput[] = userSignUpFormList;
  validatorSchema: any = userSignUpSchema;
  error: string = "";
  constructor(
    private _router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  async signup(formValue: Record<string, number | string>) {
    const { displayName, email, password } =
      formValue as unknown as IUserSignUpForm;
    const data = {
      displayName,
      email,
      password,
    };

    try {
      const user = await this.authService.register(data);
      this._router.navigate(["profile-signup", user.userId]);
    } catch (err) {
      console.log(err);
      this._snackBar.open(
        SNACKBAR_ERROR.SIGNUP_FAILED,
        SNACKBAR_ACTION.POP_UP_ACTION,
        {
          duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
          horizontalPosition: "center",
          verticalPosition: "top",
        }
      );
    }
  }
}
