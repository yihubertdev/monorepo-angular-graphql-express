import { Routes } from "@angular/router";
import { isUserLoginToUser } from "../../core/services/routeGuard/index.guard";
import { userProfileResolver } from "../../shared/resolvers/post.resolver";

export default [
  {
    path: "",
    loadComponent: () => import("./user-profile.view"),
    loadChildren: () => import("../profile"),
  },
  {
    path: "login",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./login.view"),
  },
  {
    path: "signup",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./sign-up.view"),
  },
] as Routes;
