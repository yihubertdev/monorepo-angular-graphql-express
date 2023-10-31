import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/controller/home-page-post.controller";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";
import { SETTING_MENU } from "sources-types";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HomePagePostModule,
    MatTabsModule,
    HomePagePostController,
    UserDetailsSettingsController,
  ],
  template: ` <div class="container">
    <!--justify-content-center center the inner col-->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
        <user-details-settings-controller
          [category]="category"
          [withTab]="false"></user-details-settings-controller>
      </div>
    </div>
  </div>`,
})
export default class UsersView {
  @Input() id?: string;
  category = SETTING_MENU.SECURITY;
}
