import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor.component";
import { QuillModule } from "ngx-quill";
import { FormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { UploadVideoDialogModule } from "../../dialog/uploadVideo/upload-video.module";
import { GoogleHttpService } from "src/app/core/services/http/google.http";

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    QuillModule.forRoot(),
    FormsModule,
    UploadVideoDialogModule,
  ],
  providers: [GoogleHttpService],
  exports: [EditorComponent],
})
export class EditorModule {}
