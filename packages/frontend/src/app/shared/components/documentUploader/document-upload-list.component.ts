import { Component, Input, OnInit } from "@angular/core";
import { UploadTaskSnapshot } from "@angular/fire/storage";
import { IUploadMultipleFileRes } from "src/app/core/services/fireStorage/basic.bucket";

@Component({
  selector: "document-upload-list-component",
  template: ` <ng-container>
    <mat-progress-bar
      mode="determinate"
      value="68"></mat-progress-bar>
  </ng-container>`,
  styleUrls: ["./document-uploader.component.css"],
})
export class DocumentUploadListComponent implements OnInit {
  @Input() documentUploader: {
    progress: number;
    snapshot: UploadTaskSnapshot;
  } | null = null;

  ngOnInit(): void {
    console.log(this.documentUploader);
  }
}
