import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountSettingControllerComponent } from "./controller/account-settings.controller";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { SignOutControllerComponent } from "./controller/sign-out.controller";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AccountSettingControllerComponent, SignOutControllerComponent],
  imports: [CommonModule, MatExpansionModule, FormInputListModule, MatButtonModule],
  exports: [AccountSettingControllerComponent, SignOutControllerComponent],
})
export class AccountSettingModule {}
