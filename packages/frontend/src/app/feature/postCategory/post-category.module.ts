import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { PostCategoryControllerComponent } from "./controller/post-category.controller";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [PostCategoryControllerComponent],
  imports: [CommonModule, MatChipsModule, MatIconModule, MatCardModule],
  exports: [PostCategoryControllerComponent],
})
export class PostCategoryModule {}
