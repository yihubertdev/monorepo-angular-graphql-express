import { NgModule } from "@angular/core";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AuthService } from "./auth";

@NgModule({
  declarations: [],
  imports: [provideAuth(() => getAuth())],
  providers: [AuthService],
  bootstrap: [],
})
export class FireAuthServiceModule {}
