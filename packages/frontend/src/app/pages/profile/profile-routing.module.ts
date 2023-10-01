import { Routes } from "@angular/router";
import { UsersView } from "./users.view";
import { DetailsView } from "./details.view";

export const ProfileRoutes: Routes = [
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
