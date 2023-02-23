import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmailLoginControllerComponent } from "./controller/email-login.controller";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { OAuthLoginControllerComponent } from "./controller/oauth-login.controller";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { OAuthOptionsComponent } from "./controller/oauth-options.controller";
import { EmailSignUpController } from "./controller/email-signup.controller";

@NgModule({
  declarations: [
    EmailLoginControllerComponent,
    EmailSignUpController,
    OAuthLoginControllerComponent,
    OAuthOptionsComponent,
  ],
  imports: [
    CommonModule,
    FormInputListModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
  ],
  exports: [EmailLoginControllerComponent, EmailSignUpController, OAuthLoginControllerComponent, OAuthOptionsComponent],
})
export class LoginModule {}
