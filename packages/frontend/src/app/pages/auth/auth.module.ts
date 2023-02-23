import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountViewComponent } from "./view/account-setting.view";
import { AccountSettingModule } from "src/app/feature/accountSettings/account-settings.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginView } from "./view/login.view";
import { SignUpView } from "./view/sign-up.view";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { UserProfileModule } from "src/app/feature/userProfile/user-profile.module";
import { LoginModule } from "src/app/feature/login/login.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";

@NgModule({
  declarations: [AccountViewComponent, LoginView, SignUpView],
  imports: [
    CommonModule,
    MatExpansionModule,
    AccountSettingModule,
    AuthRoutingModule,
    MatGridListModule,
    MatCardModule,
    UserProfileModule,
    LoginModule,
    GridListResponsiveDirectiveModule,
  ],
  exports: [AccountViewComponent, LoginView, SignUpView],
})
export class AuthModule {}
