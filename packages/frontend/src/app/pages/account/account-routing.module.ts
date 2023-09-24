import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { LoginGuardService } from "src/app/core/services/routeGuard/login.guard";
import { IsMeRouteGuard } from "src/app/core/services/routeGuard/user.guard";
import { LoginView } from "./view/login.view";
import { SignUpView } from "./view/sign-up.view";
import { UserProfileView } from "./view/user-profile.view";

const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full" },
  { path: "login", canActivate: [LoginGuardService], component: LoginView },
  { path: "signup", component: SignUpView },
  {
    path: "users",
    component: UserProfileView,
    loadChildren: () =>
      import("../profile/profile.module").then(
        (module) => module.ProfileModule
      ),
  },
];

// account/users/:id/personal-details
// account/users/me/personal-details

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
