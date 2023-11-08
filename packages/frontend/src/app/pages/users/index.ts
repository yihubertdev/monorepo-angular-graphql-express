import { Routes } from "@angular/router";
import {
  isUserLogin,
  isUserLoginToUser,
} from "../../core/services/routeGuard/index.guard";
import {
  loggedUserProfileResolver,
  userProfileResolver,
} from "../../shared/resolvers/post.resolver";

export default [
  {
    path: "",
    loadComponent: () => import("./user-profile.view"),
    resolve: { user: userProfileResolver },
    loadChildren: () => import("../profile"),
  },
  {
    path: "settings",
    canActivate: [isUserLogin],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./settings.view"),
    loadChildren: () => import("../settings").then((router) => router.route),
  },
  {
    path: "signup",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./sign-up.view"),
  },
  {
    path: "profile-signup",
    canActivate: [isUserLogin],
    resolve: { user: userProfileResolver },
    loadComponent: () => import("./profile-sign-up.view"),
  },
  {
    path: "notifications",
    canActivate: [isUserLogin],
    loadComponent: () => import("./notification.view"),
  },
] as Routes;
