import { Routes } from "@angular/router";

export default [
  {
    path: "",
    loadComponent: () => import("./payment.view"),
  },
] as Routes;
