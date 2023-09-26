import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LoginGuardService } from "./login.guard";

@NgModule({
  declarations: [],
  imports: [MatSnackBarModule],
  providers: [LoginGuardService],
  bootstrap: [],
})
export class GuardServiceModule {}
