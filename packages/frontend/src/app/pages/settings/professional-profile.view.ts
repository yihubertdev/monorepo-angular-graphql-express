import { Component, Input } from "@angular/core";
import { SETTING_COLLECTION } from "sources-types";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";

@Component({
  standalone: true,
  imports: [UserDetailsSettingsController],
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
export default class PersonalProfileView {
  @Input() id?: string;
  collection = SETTING_COLLECTION.PROFESSIONAL_PROFILE;
}
