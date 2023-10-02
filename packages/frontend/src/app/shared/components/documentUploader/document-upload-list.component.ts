import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StorageReference, UploadTaskSnapshot } from "@angular/fire/storage";
import { Observable } from "rxjs/internal/Observable";
import { FormFileStorageService } from "../../../core/services/fireStorage/form-file.bucket";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  standalone: true,
  imports: [MatProgressBarModule],
  selector: "document-upload-list-component",
  template: ` <ng-container>
    {{ documentName }}
    <mat-progress-bar
      mode="determinate"
      [value]="percentage"></mat-progress-bar>
  </ng-container>`,
})
export class DocumentUploadListComponent implements OnInit {
  @Input() documentPercent$: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }> | null = null;
  @Input() documentName?: string;
  @Input() storageRef?: StorageReference;
  @Output() urlEmitter = new EventEmitter<string | null>();

  public percentage: number = 0;

  constructor(private formFileStorage: FormFileStorageService) {}

  ngOnInit(): void {
    this.documentPercent$?.subscribe(async (file) => {
      this.percentage = file.progress;

      if (file.progress == 100 && this.storageRef) {
        this.urlEmitter.emit(
          await this.formFileStorage.getDownloadURL(this.storageRef)
        );
      }
    });
  }
}
