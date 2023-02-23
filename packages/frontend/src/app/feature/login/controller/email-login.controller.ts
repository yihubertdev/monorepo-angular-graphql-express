import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { userLoginSchema } from "src/app/core/joiSchema/user-login.schema";
import { LOGIN_FAILED, POP_UP_ACTION, POP_UP_DISMISS_DURATION } from "src/app/core/models/constants";
import { IFormInput } from "src/app/core/models/view.types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { userLoginFormList } from "src/app/core/static/auth.static";

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
export class EmailLoginControllerComponent implements OnInit {
  formInputList: IFormInput[] = userLoginFormList;
  validatorSchema: any = userLoginSchema;
  error: string = "";
  constructor(private _router: Router, private authService: AuthService, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    const i = 1;
  }

  async login(formValue: Record<string, number | string>) {
    console.log(formValue);
    const data = {
      email: String(formValue["email"]),
      password: String(formValue["password"]),
    };
    try {
      await this.authService.login(data);
      this._router.navigateByUrl("/account/me");
    } catch (err) {
      this._snackBar.open(LOGIN_FAILED, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
      });
    }
  }
}
