import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountSettingModule } from "src/app/feature/accountSettings/account-settings.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { UserProfileModule } from "src/app/feature/userProfile/user-profile.module";
import { LoginModule } from "src/app/feature/login/login.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";
import { ProfileRouting } from "./profile-routing.module";
import { MeView } from "./view/me.view";

@NgModule({
  declarations: [MeView],
  imports: [
    CommonModule,
    MatExpansionModule,
    AccountSettingModule,
    MatGridListModule,
    MatCardModule,
    UserProfileModule,
    LoginModule,
    GridListResponsiveDirectiveModule,
    HomePagePostModule,
    ProfileRouting,
  ],
  exports: [MeView],
})
export class ProfileModule {}
