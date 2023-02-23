import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileControllerComponent } from "./controller/user-profile.controller";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  declarations: [UserProfileControllerComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule],
  exports: [UserProfileControllerComponent],
})
export class UserProfileModule {}
