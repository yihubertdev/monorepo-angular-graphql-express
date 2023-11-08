import { Routes } from "@angular/router";
import {
  isMeLogin,
  isUserLogin,
} from "src/app/core/services/routeGuard/index.guard";
import { postByUserResolver } from "src/app/shared/resolvers/post.resolver";

export default [
  { path: "", redirectTo: "me/posts", pathMatch: "full" },
  {
    path: ":id/posts",
    resolve: { posts: postByUserResolver },
    loadComponent: () => import("./users.view"),
  },
  {
    path: ":id/personal-profile",
    canActivate: [isUserLogin],
    loadComponent: () => import("./details.view"),
  },
  {
    path: "article/:id",
    loadComponent: () => import("./article.view"),
    icon: "article",
    description: "Article",
  },
] as Routes;
