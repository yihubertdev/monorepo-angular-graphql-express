import { Component } from "@angular/core";
import { SETTING_COLLECTION } from "type-sources";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";

@Component({
  selector: "personal-profile-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: `
    <user-details-settings-controller
      style="display: block; height: 100dvh;"
      [collection]="collection"></user-details-settings-controller>
  `,
})
export default class PersonalProfileView {
  collection = SETTING_COLLECTION.PERSONAL_PROFILE;
}
