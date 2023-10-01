import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersView } from "./view/users.view";
import { DetailsView } from "./view/details.view";

const routes: Routes = [
  { path: "", redirectTo: "me/posts", pathMatch: "full" },
  {
    path: ":id/posts",
    canActivate: [],
    component: UsersView,
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
