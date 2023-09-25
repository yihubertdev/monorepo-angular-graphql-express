import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { LoginGuardService } from "src/app/core/services/routeGuard/login.guard";
import { LoginView } from "./view/login.view";
import { SignUpView } from "./view/sign-up.view";
import { UserProfileView } from "./view/user-profile.view";

const routes: Routes = [
  {
    path: "",
    component: UserProfileView,
    loadChildren: () =>
      import("../profile/profile.module").then(
        (module) => module.ProfileModule
      ),
  },
  { path: "login", canActivate: [LoginGuardService], component: LoginView },
  { path: "signup", component: SignUpView },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class UserRouting {}
