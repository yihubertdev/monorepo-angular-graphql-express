import { Component } from "@angular/core";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";
import { SETTING_COLLECTION } from "sources-types";

@Component({
  selector: "security-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: `
    <user-details-settings-controller
      [collection]="collection"></user-details-settings-controller>
  `,
})
export default class SecurityView {
  collection = SETTING_COLLECTION.SECURITY;
}
