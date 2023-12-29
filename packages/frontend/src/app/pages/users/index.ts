import { Routes } from "@angular/router";
import {
  isUserLogin,
  isUserVerified,
  loginCheck,
} from "../../core/services/routeGuard/index.guard";
import {
  loggedUserProfileResolver,
  userProfileResolver,
} from "../../shared/resolvers/post.resolver";

export const profileSetting: Routes = [
  {
    path: "network",
    canActivate: [isUserLogin],
    loadComponent: () => import("./network.view"),
    loadChildren: () => import("../profile").then((router) => router.route),
  },
  {
    path: "setting",
    canActivate: [isUserVerified],
    loadComponent: () => import("./setting.view"),
    loadChildren: () => import("../settings").then((router) => router.route),
  },
];
// three level menu
// {
//   profile: {
//     network: {
//       post: ""
//     },
//     setting: {
//       security: ""
//     }
//   }
// }
export default [
  {
    path: "profile/:id",
    loadComponent: () => import("./profile.view"),
    resolve: { user: userProfileResolver },
    loadChildren: () => profileSetting,
  },
  {
    path: "add-post",
    canActivate: [isUserVerified],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-post.view"),
  },
  {
    path: "add-article",
    canActivate: [isUserVerified],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-article.view"),
  },
  {
    path: "financing",
    loadComponent: () => import("./financing.view"),
  },
  {
    path: "signup",
    canActivate: [loginCheck],
    loadComponent: () => import("./sign-up.view"),
  },
  {
    path: "notifications",
    canActivate: [isUserVerified],
    loadComponent: () => import("./notification.view"),
  },
] as Routes;
