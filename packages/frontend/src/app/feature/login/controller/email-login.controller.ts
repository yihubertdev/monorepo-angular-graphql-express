import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { userLoginSchema } from "src/app/core/joiSchema/user-login.schema";
import { IFormInput, SNACKBAR_ERROR, SNACKBAR_ACTION } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { userLoginFormList } from "../../../core/static/auth.static";
import { SITE_ROUTE_PAGE } from "../../../core/static/menu.static";

@Component({
  selector: "email-login-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="UserLoginFeature"
    [validatorSchema]="validatorSchema"
    buttonName="Login"
    (formValue)="login($event)"></form-input-list-component>`,
  styleUrls: [],
})
export class EmailLoginControllerComponent {
  formInputList: IFormInput[] = userLoginFormList;
  validatorSchema: any = userLoginSchema;
  constructor(
    private _router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  login(formValue: Record<string, number | string>) {
    const data = {
      email: String(formValue["email"]),
      password: String(formValue["password"]),
    };
    try {
      this.authService.login(data);
      this._router.navigate(SITE_ROUTE_PAGE.MY_POSTS);
    } catch (err) {
      console.log(err);
      this._snackBar.open(
        SNACKBAR_ERROR.ADD_ARTICLE_ERROR,
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
