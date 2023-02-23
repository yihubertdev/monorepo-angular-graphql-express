import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditArticleController } from "./controller/edit-article.controller";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [EditArticleController],
  imports: [CommonModule, FormInputListModule, MatSnackBarModule],
  exports: [EditArticleController],
})
export class EditArticleModule {}
