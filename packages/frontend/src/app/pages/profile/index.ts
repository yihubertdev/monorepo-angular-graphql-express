import { Routes } from "@angular/router";
import { isUserLogin } from "src/app/core/services/routeGuard/index.guard";

export default [
  { path: "", redirectTo: "me/posts", pathMatch: "full" },
  {
    path: ":id/posts",
    canActivate: [],
    loadComponent: () => import("./users.view"),
  },
  {
    path: ":id/personal-profile",
    canActivate: [isUserLogin],
    loadComponent: () => import("./details.view"),
  },
] as Routes;
