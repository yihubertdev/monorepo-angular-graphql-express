import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { userSignUpSchema } from "src/app/core/joiSchema/user-login.schema";
import {
  LOGIN_FAILED,
  POP_UP_ACTION,
  POP_UP_DISMISS_DURATION,
  SIGNUP_FAILED,
} from "src/app/core/models/constants";
import { IUserSignUpForm } from "src/app/core/models/users.type";
import { IFormInput } from "src/app/core/models/view.types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { userSignUpFormList } from "src/app/core/static/auth.static";

@Component({
  selector: "email-signup-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EmailSignUpController"
    [validatorSchema]="validatorSchema"
    buttonName="SignUp"
    (formValue)="signup($event)"></form-input-list-component>`,
  styleUrls: [],
})
export class EmailSignUpController implements OnInit {
  formInputList: IFormInput[] = userSignUpFormList;
  validatorSchema: any = userSignUpSchema;
  error: string = "";
  constructor(
    private _router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const i = 1;
  }

  async signup(formValue: Record<string, number | string>) {
    const { username, email, password } =
      formValue as unknown as IUserSignUpForm;
    const data = {
      username,
      email,
      password,
    };
    try {
      await this.authService.register(data);
      this._router.navigateByUrl("/account/login");
    } catch (err) {
      this._snackBar.open(SIGNUP_FAILED, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
      });
    }
  }
}
