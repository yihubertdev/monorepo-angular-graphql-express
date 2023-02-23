import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditBlogController } from "./controller/edit-blog.controller";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [EditBlogController],
  imports: [CommonModule, FormInputListModule, MatSnackBarModule],
  exports: [EditBlogController],
})
export class EditBlogModule {}
