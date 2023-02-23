import { NgModule } from "@angular/core";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { BrowserStorageServiceModule } from "../browserStorage/browserStorage.module";
import { AuthService } from "./auth";

@NgModule({
  declarations: [],
  imports: [provideAuth(() => getAuth()), BrowserStorageServiceModule],
  providers: [AuthService],
  bootstrap: [],
})
export class FireAuthServiceModule {}
