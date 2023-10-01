import { Routes } from "@angular/router";

export default [
  // { path: "", redirectTo: "home/posts", pathMatch: "full" },
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/view/post.view").then((module) => module.PostView),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((module) => module.PostModule),
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./pages/edit/edit.module").then((module) => module.EditModule),
  },
  {
    path: "search",
    loadChildren: () =>
      import("./pages/search/search.module").then(
        (module) => module.SearchModule
      ),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/payment/payment.module").then(
        (module) => module.PaymentModule
      ),
  },
  {
    path: "users",
    loadChildren: () => import("./pages/users/routes"),
  },
] as Routes;
