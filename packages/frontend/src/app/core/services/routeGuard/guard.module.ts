import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserStorageServiceModule } from "../browserStorage/browserStorage.module";
import { LoginGuardService } from "./login.guard";
import { IsMeRouteGuard, UserGuardService } from "./user.guard";

@NgModule({
  declarations: [],
  imports: [BrowserStorageServiceModule, MatSnackBarModule],
  providers: [UserGuardService, LoginGuardService, IsMeRouteGuard],
  bootstrap: [],
})
export class GuardServiceModule {}
