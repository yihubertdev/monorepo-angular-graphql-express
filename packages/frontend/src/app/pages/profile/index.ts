import { IMenu } from "sources-types";
import {
  isMeLogin,
  isUserLogin,
} from "src/app/core/services/routeGuard/index.guard";
import { IFullRoute } from "src/app/routes";
import { postByUserResolver } from "src/app/shared/resolvers/post.resolver";

export const route: IFullRoute[] = [
  {
    path: "",
    redirectTo: "posts",
    pathMatch: "full",
    icon: "",
    description: "",
  },
  {
    path: "posts",
    icon: "feed",
    description: "Posts",
    resolve: { posts: postByUserResolver },
    loadComponent: () => import("./posts.view"),
  },
  {
    path: "articles",
    icon: "article",
    description: "Articles",
    resolve: { posts: postByUserResolver },
    loadComponent: () => import("./articles.view"),
  },
  {
    path: "profile",
    icon: "account_circle",
    description: "Profile",
    canActivate: [isUserLogin],
    loadComponent: () => import("./details.view"),
  },
  // {
  //   path: "article/:id",
  //   loadComponent: () => import("./article.view"),
  //   icon: "article",
  //   description: "Article",
  // },
];

export const PROFILE_MENU: IMenu[] = route
  .filter((route) => route.path)
  .map((route) => ({
    link: route.path!,
    description: route.description,
    iconName: route.icon,
  }));
