import { NgModule } from "@angular/core";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AuthService } from "./auth";
import { UserSignalsStateService } from "../signal/userAuth.signal";

@NgModule({
  declarations: [],
  imports: [provideAuth(() => getAuth())],
  providers: [AuthService, UserSignalsStateService],
  bootstrap: [],
})
export class FireAuthServiceModule {}
