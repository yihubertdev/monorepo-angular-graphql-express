import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileControllerComponent } from "./controller/user-profile.controller";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { StringTransformPipe } from "./controller/string-transform.pipe";

@NgModule({
  declarations: [UserProfileControllerComponent, StringTransformPipe],
  imports: [CommonModule, MatCardModule, MatGridListModule],
  exports: [UserProfileControllerComponent, StringTransformPipe],
})
export class UserProfileModule {}
