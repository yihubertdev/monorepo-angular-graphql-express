import { NgModule } from "@angular/core";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { BrowserStorageServiceModule } from "../browserStorage/browserStorage.module";
import { AuthService } from "./auth";
import { UserSignalsStateService } from "../signal/userAuth.signal";

@NgModule({
  declarations: [],
  imports: [provideAuth(() => getAuth()), BrowserStorageServiceModule],
  providers: [AuthService, UserSignalsStateService],
  bootstrap: [],
})
export class FireAuthServiceModule {}
