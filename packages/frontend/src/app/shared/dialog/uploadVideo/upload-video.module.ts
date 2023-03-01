import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GoogleHttpService } from "src/app/core/services/http/google.http";
import { UploadVideoDialog } from "./upload-video.dialog";

@NgModule({
  declarations: [UploadVideoDialog],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [GoogleHttpService],
  exports: [UploadVideoDialog],
})
export class UploadVideoDialogModule {}
