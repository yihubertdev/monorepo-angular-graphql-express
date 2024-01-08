import { Component, Input } from "@angular/core";
import { SETTING_COLLECTION } from "sources-types";
import { UserDetailsSettingsController } from "src/app/feature/userProfile/user-details-settings.controller";

@Component({
  selector: "personal-networth-view",
  standalone: true,
  imports: [UserDetailsSettingsController],
  template: ` <user-details-settings-controller
    style="display: block; height: 100dvh;"
    [collection]="collection"></user-details-settings-controller>`,
})
export default class PersonalNetWorthView {
  collection = SETTING_COLLECTION.PERSONAL_NET_WORTH;
}
