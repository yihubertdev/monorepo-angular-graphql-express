import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountSettingModule } from "src/app/feature/accountSettings/account-settings.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { LoginModule } from "src/app/feature/login/login.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";
import { ProfileRouting } from "./profile-routing.module";
import { UsersView } from "./view/users.view";
import { DetailsView } from "./view/details.view";
import { UserProfileController } from "src/app/feature/userProfile/user-profile.controller";
import { UserDetailsController } from "src/app/feature/userProfile/user-details.controller";

@NgModule({
  declarations: [DetailsView],
  imports: [
    CommonModule,
    MatExpansionModule,
    AccountSettingModule,
    MatGridListModule,
    MatCardModule,
    UserProfileController,
    UserDetailsController,
    LoginModule,
    GridListResponsiveDirectiveModule,
    HomePagePostModule,
    ProfileRouting,
  ],
  exports: [DetailsView],
})
export class ProfileModule {}
