import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
} from "@angular/fire/storage";
import { Observable } from "rxjs/internal/Observable";
import { FormFileStorageService } from "../../../core/services/fireStorage/form-file.bucket";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { DecimalPipe } from "@angular/common";

@Component({
  standalone: true,
  imports: [MatProgressBarModule, DecimalPipe],
  providers: [FormFileStorageService],
  selector: "document-upload-list-component",
  template: ` <ng-container>
    {{ documentName }}
    <mat-progress-bar
      mode="determinate"
      [value]="percentage"></mat-progress-bar>
    <p
      class="m-0 p-0"
      style="float:right">
      {{ percentage | number : "1.0-0" }}
    </p>
  </ng-container>`,
})
export class DocumentUploadListComponent implements OnInit {
  @Input({ required: true }) documentPercent$: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }> | null = null;
  @Input({ required: true }) documentName!: string;
  @Input({ required: true }) storageRef!: StorageReference;
  @Input({ required: true }) task!: UploadTask;
  @Output() urlEmitter = new EventEmitter<string | null>();

  public percentage: number = 0;

  constructor(private formFileStorage: FormFileStorageService) {}

  async ngOnInit(): Promise<void> {
    this.documentPercent$?.subscribe(async (file) => {
      this.percentage = file.progress;
    });

    await this.task;
    this.urlEmitter.emit(
      await this.formFileStorage.getDownloadURL(this.storageRef)
    );
  }
}
