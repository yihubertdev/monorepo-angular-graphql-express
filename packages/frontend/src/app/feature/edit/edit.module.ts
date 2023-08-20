import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditArticleController } from "./controller/edit-article.controller";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EditPostController } from "./controller/edit-post.controller";

@NgModule({
  declarations: [EditArticleController, EditPostController],
  imports: [CommonModule, FormInputListModule, MatSnackBarModule],
  exports: [EditArticleController, EditPostController],
})
export class EditControllerModule {}
