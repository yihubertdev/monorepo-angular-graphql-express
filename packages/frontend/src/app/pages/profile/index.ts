import { Routes } from "@angular/router";

export default [
  { path: "", redirectTo: "me/posts", pathMatch: "full" },
  {
    path: ":id/posts",
    canActivate: [],
    loadComponent: () => import("./users.view"),
  },
  {
    path: ":id/personal-profile",
    canActivate: [],
    loadComponent: () => import("./details.view"),
  },
] as Routes;
