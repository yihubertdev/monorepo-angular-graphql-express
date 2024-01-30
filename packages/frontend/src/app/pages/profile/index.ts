import { IMenu } from "sources-types";
import {
  isMeLogin,
  isUserLogin,
  isUserVerified,
} from "src/app/core/services/routeGuard/index.guard";
import { IFullRoute } from "src/app/routes";
import {
  loggedUserProfileResolver,
  postByUserResolver,
} from "src/app/shared/resolvers/post.resolver";

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
    canActivate: [isMeLogin],
    resolve: { posts: postByUserResolver },
    loadComponent: () => import("./posts.view"),
  },
  {
    path: "articles",
    icon: "article",
    description: "Articles",
    canActivate: [isMeLogin],
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
  {
    path: "add-post",
    description: "NETWORK POST",
    icon: "post_add",
    canActivate: [isUserVerified],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-post.view"),
  },
  {
    path: "add-article",
    description: "NETWORK ARTICLE",
    icon: "post_add",
    canActivate: [isUserVerified],
    resolve: { user: loggedUserProfileResolver },
    loadComponent: () => import("./add-article.view"),
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
