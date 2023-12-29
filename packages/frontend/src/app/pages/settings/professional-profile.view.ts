import { Component, Input } from "@angular/core";
import { SETTING_COLLECTION } from "sources-types";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";

@Component({
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: `
    <user-details-settings-controller
      [collection]="collection"></user-details-settings-controller>
  `,
})
export default class PersonalProfileView {
  collection = SETTING_COLLECTION.PROFESSIONAL_PROFILE;
}
