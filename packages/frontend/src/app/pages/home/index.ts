import {
  isUserLoginToUser,
  isUserVerified,
} from "../../core/services/routeGuard/index.guard";
import { homePagePostResolver } from "../../shared/resolvers/post.resolver";
import { IFullRoute } from "../../routes";
import { IMenu, ISVGIconMenu } from "sources-types";
// URL naming
// key1, key2 are paramteres
// https//www.hubspotexample.com/page?key1=value1&key2=value2
// id is variable
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
    resolve: { posts: homePagePostResolver },
    loadComponent: () => import("./post.view"),
    icon: "feed",
    description: "Post",
  },
  {
    path: "login",
    canActivate: [isUserLoginToUser],
    loadComponent: () => import("./login.view"),
    icon: "person",
    description: "Login",
  },
];

export const HOME_MENU: ISVGIconMenu[] = route
  .filter((route) => route.path)
  .map((route) => ({
    link: ["home", route.path!],
    description: route.description,
    iconName: route.icon,
    src: "",
  }));
