import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { isUserLoginToUser } from "../../core/services/routeGuard/index.guard";
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
  { path: "login", canActivate: [isUserLoginToUser], component: LoginView },
  { path: "signup", canActivate: [isUserLoginToUser], component: SignUpView },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouting {}
