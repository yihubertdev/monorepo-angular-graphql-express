import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileControllerComponent } from "./controller/user-profile.controller";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { StringTransformPipeModule } from "angular-shared-ui";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [UserProfileControllerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    StringTransformPipeModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [UserProfileControllerComponent],
})
export class UserProfileModule {}
