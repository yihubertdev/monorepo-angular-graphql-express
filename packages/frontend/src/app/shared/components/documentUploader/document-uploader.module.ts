import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentUploaderComponent } from "./document-uploader.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FireStorageServiceModule } from "src/app/core/services/fireStorage/fire-storage.module";
import { MatListModule } from "@angular/material/list";
import { DocumentUploadListComponent } from "./document-upload-list.component";

@NgModule({
  declarations: [DocumentUploaderComponent, DocumentUploadListComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FireStorageServiceModule,
    MatListModule,
  ],
  exports: [DocumentUploaderComponent, DocumentUploadListComponent],
})
export class DocumentUploaderModule {}
