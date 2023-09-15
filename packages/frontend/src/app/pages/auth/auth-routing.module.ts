import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { LoginGuardService } from "src/app/core/services/routeGuard/login.guard";
import {
  IsMeRouteGuard,
  UserGuardService,
} from "src/app/core/services/routeGuard/user.guard";
import { AccountViewComponent } from "./view/account-setting.view";
import { LoginView } from "./view/login.view";
import { SignUpView } from "./view/sign-up.view";
import { UserProfileView } from "./view/user-profile.view";

const routes: Routes = [
  { path: "", redirectTo: "me", pathMatch: "full" },
  {
    path: "me",
    canActivate: [UserGuardService],
    component: AccountViewComponent,
  },
  { path: "login", canActivate: [LoginGuardService], component: LoginView },
  { path: "signup", component: SignUpView },
  {
    path: "users/:id",
    canActivate: [LoginGuardService, IsMeRouteGuard],
    component: UserProfileView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
