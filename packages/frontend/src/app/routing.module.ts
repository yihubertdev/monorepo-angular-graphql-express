import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
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
    path: "account",
    loadChildren: () =>
      import("./pages/account/account.module").then(
        (module) => module.AccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
