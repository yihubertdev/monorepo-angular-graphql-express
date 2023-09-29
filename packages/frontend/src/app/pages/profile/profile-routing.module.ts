import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MeView } from "./view/me.view";
import { UsersView } from "./view/users.view";
import { DetailsView } from "./view/details.view";
import { isUserLogin } from "src/app/core/services/routeGuard/index.guard";

const routes: Routes = [
  { path: "", redirectTo: "me", pathMatch: "full" },
  {
    path: "me/posts",
    canActivate: [isUserLogin],
    component: MeView,
  },
  {
    path: ":id/posts",
    canActivate: [],
    component: UsersView,
  },
  {
    path: "me/personal-profile",
    canActivate: [isUserLogin],
    component: DetailsView,
  },
  {
    path: ":id/personal-profile",
    canActivate: [],
    component: DetailsView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {}
