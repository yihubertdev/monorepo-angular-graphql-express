import { Routes } from "@angular/router";

export default [
  { path: "", redirectTo: "home/posts", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./pages/home"),
  },
  {
    path: "edit",
    loadChildren: () => import("./pages/edit"),
  },
  {
    path: "payment",
    loadChildren: () => import("./pages/payment"),
  },
  {
    path: "users",
    loadChildren: () => import("./pages/users"),
  },
] as Routes;
