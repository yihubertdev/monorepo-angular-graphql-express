import { Routes } from "@angular/router";
import {
  isMeLogin,
  isUserLogin,
} from "../../core/services/routeGuard/index.guard";
import { postByUserResolver } from "../../shared/resolvers/post.resolver";

export default [
  { path: "", redirectTo: "security", pathMatch: "full" },
  {
    path: "security",
    canActivate: [isMeLogin],
    resolve: { posts: postByUserResolver },
    loadComponent: () => import("./security.view"),
  },
] as Routes;
