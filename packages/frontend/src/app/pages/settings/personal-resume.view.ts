import { Component } from "@angular/core";
import { SETTING_COLLECTION } from "sources-types";
import { UserDetailsSettingsController } from "src/app/feature/userProfile/user-details-settings.controller";

@Component({
  selector: "personal-resume-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: `
    <user-details-settings-controller
      [collection]="collection"></user-details-settings-controller>
  `,
})
export default class PersonalResumeView {
  collection = SETTING_COLLECTION.PERSONAL_RESUME;
}
