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
    loadChildren: () => import("../settings"),
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
  {
    path: "profile-signup/:id",
    resolve: { user: userProfileResolver },
    loadComponent: () => import("./profile-sign-up.view"),
  },
  {
    path: "notifications",
    canActivate: [isUserLogin],
    loadComponent: () => import("./notification.view"),
  },
] as Routes;
