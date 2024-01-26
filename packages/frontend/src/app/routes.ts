import { Route, Routes } from "@angular/router";
import { usersResolver } from "./shared/resolvers/post.resolver";

export interface IFullRoute extends Route {
  description: string;
  icon: string;
}

export default [
  { path: "", redirectTo: "home/posts", pathMatch: "full" },
  {
    path: "home",
    resolve: {
      users: usersResolver,
    },
    loadChildren: () => import("./pages/home").then((router) => router.route),
  },
  {
    path: "payment",
    loadChildren: () => import("./pages/payment"),
  },
  {
    path: "users",
    resolve: {
      users: usersResolver,
    },
    loadChildren: () => import("./pages/users").then((router) => router.route),
  },
] as Routes;
