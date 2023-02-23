import { NgModule } from "@angular/core";
import { CookieService } from "./cookie";
import { LocalStorageService } from "./localStorage";
import { SessionStorageService } from "./sessionStorage";

@NgModule({
  declarations: [],
  imports: [],
  providers: [CookieService, LocalStorageService, SessionStorageService],
  bootstrap: [],
})
export class BrowserStorageServiceModule {}
