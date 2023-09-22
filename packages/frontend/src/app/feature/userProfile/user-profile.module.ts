import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileControllerComponent } from "./controller/user-profile.controller";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { StringTransformPipeModule } from "angular-shared-ui";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { UserDetailsController } from "./controller/user-details.controller";
import { GridListResponsiveDirectiveModule } from "../../shared/directives/matGridListResponsive/matGridListResponsive.module";
import { FormInputListModule } from "../../shared/components/formInputList/form-input-list.module";

@NgModule({
  declarations: [UserProfileControllerComponent, UserDetailsController],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    StringTransformPipeModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    GridListResponsiveDirectiveModule,
    FormInputListModule,
  ],
  exports: [UserProfileControllerComponent, UserDetailsController],
})
export class UserProfileModule {}
