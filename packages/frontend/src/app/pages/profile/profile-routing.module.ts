import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { MeView } from "./view/me.view";
import { UsersView } from "./view/users.view";
import { DetailsView } from "./view/details.view";

const routes: Routes = [
  { path: "", redirectTo: "me", pathMatch: "full" },
  {
    path: "me/posts",
    canActivate: [],
    component: MeView,
  },
  {
    path: ":id/posts",
    canActivate: [],
    component: UsersView,
  },
  {
    path: "me/personal-profile",
    canActivate: [],
    component: DetailsView,
  },
  {
    path: ":id/personal-profile",
    canActivate: [],
    component: DetailsView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class ProfileRouting {}
