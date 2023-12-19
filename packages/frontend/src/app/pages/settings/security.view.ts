import { Component, Input } from "@angular/core";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";
import { SETTING_COLLECTION } from "sources-types";

@Component({
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: ` <div class="container-fluid m-0 p-0">
    <!--justify-content-center center the inner col-->
    <div class="row">
      <div
        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12"
        style="padding-left: 0;">
        <user-details-settings-controller
          [collection]="collection"></user-details-settings-controller>
      </div>
    </div>
  </div>`,
})
export default class UsersView {
  @Input() id?: string;
  collection = SETTING_COLLECTION.SECURITY;
}
