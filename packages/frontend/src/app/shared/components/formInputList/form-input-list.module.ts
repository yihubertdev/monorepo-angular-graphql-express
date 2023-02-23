import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { FormInputListComponent } from "./form-input-list.component";
import { DocumentUploaderModule } from "../documentUploader/document-uploader.module";
import { FireStorageServiceModule } from "src/app/core/services/fireStorage/fire-storage.module";
import { EditorModule } from "../editor/editor.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [FormInputListComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    DocumentUploaderModule,
    FireStorageServiceModule,
    EditorModule,
  ],
  exports: [FormInputListComponent],
})
export class FormInputListModule {}
