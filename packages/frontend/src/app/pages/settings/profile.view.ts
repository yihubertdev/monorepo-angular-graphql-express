import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/controller/home-page-post.controller";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";
import { UserDetailsSettingsTabController } from "../../feature/userProfile/user-details-settings-tab.controller";
import { SETTING_SECTION } from "sources-types";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HomePagePostModule,
    MatTabsModule,
    HomePagePostController,
    UserDetailsSettingsTabController,
  ],
  template: ` <div class="container">
    <!--justify-content-center center the inner col-->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
        <user-details-settings-tab-controller
          [section]="section"></user-details-settings-tab-controller>
      </div>
    </div>
  </div>`,
})
export default class UsersView {
  @Input() id?: string;
  section = SETTING_SECTION.PROFILE;
}
