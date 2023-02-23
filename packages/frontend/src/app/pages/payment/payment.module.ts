import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentViewComponent } from "./view/payment.view";
import { PaymentRoutingModule } from "./payment-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { PostCategoryModule } from "src/app/feature/postCategory/post-category.module";

@NgModule({
  declarations: [PaymentViewComponent],
  imports: [CommonModule, MatGridListModule, MatCardModule, PostCategoryModule, PaymentRoutingModule],
  exports: [PaymentViewComponent],
})
export class PaymentModule {}
