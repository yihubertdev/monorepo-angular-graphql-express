import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { userSignUpSchema } from "src/app/core/joiSchema/user-login.schema";
import { IUserSignUpForm, IFormInput } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { userSignUpFormList } from "src/app/core/static/auth.static";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { JoiSchemaBuilder } from "src/app/core/utils/validator";

@Component({
  standalone: true,
  imports: [RouterModule, FormInputListComponent],
  providers: [AuthService],
  selector: "email-signup-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EmailSignUpController"
    [validatorSchema]="validatorSchema"
    buttonName="SignUp"
    (formValue)="signup($event)"
    [loading]="isLoading"></form-input-list-component>`,
  styleUrls: [],
})
export class EmailSignUpController {
  public formInputList: IFormInput[] = userSignUpFormList;
  public validatorSchema: JoiSchemaBuilder<IUserSignUpForm> = userSignUpSchema;
  public isLoading: boolean = false;
  constructor(private _router: Router, private authService: AuthService) {}

  async signup(formValue: Record<string, number | string>) {
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
