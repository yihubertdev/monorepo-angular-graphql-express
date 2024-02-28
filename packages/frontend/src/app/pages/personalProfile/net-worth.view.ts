import { Component } from "@angular/core";
import { SETTING_COLLECTION } from "type-sources";
import { UserDetailsSettingsController } from "../../feature/userProfile/user-details-settings.controller";

@Component({
  selector: "personal-networth-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: ` <user-details-settings-controller
    [collection]="collection"></user-details-settings-controller>`,
})
export default class PersonalNetWorthView {
  collection = SETTING_COLLECTION.PERSONAL_NET_WORTH;
}
