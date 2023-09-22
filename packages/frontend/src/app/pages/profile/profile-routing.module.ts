import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { LoginGuardService } from "src/app/core/services/routeGuard/login.guard";
import { IsMeRouteGuard } from "src/app/core/services/routeGuard/user.guard";
import { MeView } from "./view/me.view";

const routes: Routes = [
  {
    path: "",
    canActivate: [],
    component: MeView,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class ProfileRouting {}
