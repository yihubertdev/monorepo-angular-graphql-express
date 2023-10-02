import { Routes } from "@angular/router";
import { isUserLogin } from "../../core/services/routeGuard/index.guard";

export default [
  {
    path: "",
    redirectTo: "article",
    pathMatch: "full",
  },
  {
    path: "article",
    canActivate: [isUserLogin],
    loadComponent: () => import("./edit-article.view"),
  },
  {
    path: "post",
    canActivate: [isUserLogin],
    loadComponent: () => import("./edit-blog.view"),
  },
] as Routes;
