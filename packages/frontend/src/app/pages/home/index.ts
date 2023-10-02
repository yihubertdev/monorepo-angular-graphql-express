import { Routes } from "@angular/router";

export default [
  {
    path: "",
    loadComponent: () => import("./post.view"),
  },
  // URL naming
  // key1, key2 are paramteres
  // https//www.hubspotexample.com/page?key1=value1&key2=value2
  // page is variable
  {
    path: "article/:id",
    loadComponent: () => import("./article.view"),
  },
] as Routes;
