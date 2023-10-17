import { Routes } from "@angular/router";
import { postResolver } from "../../shared/resolvers/post.resolver";

export default [
  {
    path: "",
    redirectTo: "posts",
    pathMatch: "full",
  },
  {
    path: "posts",
    resolve: { posts: postResolver },
    loadComponent: () => import("./post.view"),
  },
  // URL naming
  // key1, key2 are paramteres
  // https//www.hubspotexample.com/page?key1=value1&key2=value2
  // id is variable
  {
    path: "article/:id",
    loadComponent: () => import("./article.view"),
  },
  {
    path: "notification",
    loadComponent: () => import("./article.view"),
  },
] as Routes;
