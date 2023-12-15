import { Routes } from "@angular/router";
import {
  isUserLogin,
  isUserLoginToUser,
  isUserVerified,
} from "../../core/services/routeGuard/index.guard";
import {
  loggedUserProfileResolver,
  userProfileResolver,
} from "../../shared/resolvers/post.resolver";

export default [
  {
    path: "profile/:id",
    loadComponent: () => import("./user-profile.view"),
    resolve: { user: userProfileResolver },
    loadChildren: () => import("../profile").then((router) => router.route),
  },
  {
    path: "add-post",
    canActivate: [isUserLogin],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-post.view"),
  },
  {
    path: "add-article",
    canActivate: [isUserLogin],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-article.view"),
  },
  {
    path: "settings",
    canActivate: [isUserLogin, isUserVerified],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./settings.view"),
    loadChildren: () => import("../settings").then((router) => router.route),
  },
  {
    path: "financing",
    loadComponent: () => import("./financing.view"),
  },
  {
    path: "signup",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./sign-up.view"),
  },
  {
    path: "profile-signup",
    canActivate: [isUserLogin],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./profile-sign-up.view"),
  },
  {
    path: "notifications",
    canActivate: [isUserLogin],
    loadComponent: () => import("./notification.view"),
  },
] as Routes;
