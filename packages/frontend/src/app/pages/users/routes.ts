import { Routes } from "@angular/router";
import { isUserLoginToUser } from "../../core/services/routeGuard/index.guard";

export default [
  {
    path: "",
    loadComponent: () =>
      import("./user-profile.view").then((m) => m.UserProfileView),
    loadChildren: () =>
      import("../profile/profile-routing.module").then(
        (module) => module.ProfileRoutes
      ),
  },
  {
    path: "login",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./login.view").then((m) => m.LoginView),
  },
  {
    path: "signup",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./sign-up.view").then((m) => m.SignUpView),
  },
] as Routes;
