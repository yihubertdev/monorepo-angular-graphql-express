import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentViewComponent } from "./view/payment.view";

const routes: Routes = [{ path: "", component: PaymentViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
