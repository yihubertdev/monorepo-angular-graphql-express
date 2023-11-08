import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/controller/home-page-post.controller";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";
import { SETTING_COLLECTION } from "sources-types";
import { UserDetailsSettingsController } from "src/app/feature/userProfile/user-details-settings.controller";

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
      <!--padding set to 0 so dropdown panel and top profile image have same width-->
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 p-0">
        <user-details-settings-controller
          [collection]="collection"></user-details-settings-controller>
      </div>
    </div>
  </div>`,
})
export default class PersonalNetWorthView {
  @Input() id?: string;
  collection = SETTING_COLLECTION.PERSONAL_NET_WORTH;
}
