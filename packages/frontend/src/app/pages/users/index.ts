import { Routes } from "@angular/router";
import {
  LoginGuardService,
  isMeLogin,
  isUserLoginToUser,
} from "../../core/services/routeGuard/index.guard";
import { userProfileResolver } from "../../shared/resolvers/post.resolver";

export default [
  {
    path: "",
    loadComponent: () => import("./user-profile.view"),
    resolve: { user: userProfileResolver },
    loadChildren: () => import("../profile"),
  },
  {
    path: "login",
    canActivate: [LoginGuardService, isUserLoginToUser],
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
    path: "notification/:id",
    canActivate: [isMeLogin],
    resolve: { user: userProfileResolver },
    loadComponent: () => import("./profile-sign-up.view"),
  },
] as Routes;
