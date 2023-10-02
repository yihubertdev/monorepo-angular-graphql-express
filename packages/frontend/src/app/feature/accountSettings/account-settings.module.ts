import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountSettingControllerComponent } from "./controller/account-settings.controller";
import { SignOutControllerComponent } from "./controller/sign-out.controller";
import { MatButtonModule } from "@angular/material/button";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";

@NgModule({
  declarations: [AccountSettingControllerComponent, SignOutControllerComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormInputListComponent,
    MatButtonModule,
  ],
  exports: [AccountSettingControllerComponent, SignOutControllerComponent],
})
export class AccountSettingModule {}
