import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentUploaderComponent } from "./document-uploader.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FireStorageServiceModule } from "src/app/core/services/fireStorage/fire-storage.module";

@NgModule({
  declarations: [DocumentUploaderComponent],
  imports: [CommonModule, MatProgressBarModule, FireStorageServiceModule],
  exports: [DocumentUploaderComponent],
})
export class DocumentUploaderModule {}
