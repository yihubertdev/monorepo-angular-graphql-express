import { Component, Input, OnInit } from "@angular/core";
import { UploadTask, UploadTaskSnapshot } from "@angular/fire/storage";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "document-upload-list-component",
  template: ` <ng-container>
    {{ documentName }}
    <mat-progress-bar
      mode="determinate"
      [value]="percentage"></mat-progress-bar>
  </ng-container>`,
  styleUrls: ["./document-uploader.component.css"],
})
export class DocumentUploadListComponent implements OnInit {
  @Input() documentPercent$: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }> | null = null;
  @Input() documentName: UploadTask | null = null;

  public percentage: number = 0;

  ngOnInit(): void {
    console.log(this.documentName);
    this.documentPercent$?.subscribe((file) => {
      this.percentage = file.progress;
    });
  }
}
