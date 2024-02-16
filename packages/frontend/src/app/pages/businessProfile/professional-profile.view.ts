import { Component } from "@angular/core";
import { SETTING_COLLECTION } from "sources";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";

@Component({
  selector: "professional-profile-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: `
    <user-details-settings-controller
      style="display: block; height: 100dvh;"
      [collection]="collection"></user-details-settings-controller>
  `,
})
export default class ProfessionalProfileView {
  collection = SETTING_COLLECTION.PROFESSIONAL_PROFILE;
}
