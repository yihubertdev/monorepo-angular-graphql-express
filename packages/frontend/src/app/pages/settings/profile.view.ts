import { Component, Input } from "@angular/core";
import { UserDetailsSettingsTabController } from "../../feature/userProfile/user-details-settings-tab.controller";
import { SETTING_COLLECTIONTAB } from "sources-types";

@Component({
  standalone: true,
  imports: [UserDetailsSettingsTabController],
  template: ` <div class="container">
    <!--justify-content-center center the inner col-->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
        <user-details-settings-tab-controller
          [collection]="collection"></user-details-settings-tab-controller>
      </div>
    </div>
  </div>`,
})
export default class UsersView {
  @Input() id?: string;
  collection = SETTING_COLLECTIONTAB.PROFILE;
}
