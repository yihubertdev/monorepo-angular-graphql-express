import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormFileStorageService } from "src/app/core/services/fireStorage/form-file.bucket";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "document-uploader-component",
  template: ` <section style="display: block">
    <input type="file" matinput (change)="uploadImage($event.target)" />
    <mat-progress-bar mode="determinate" [value]="uploadPercentage"></mat-progress-bar>
  </section>`,
  styleUrls: ["./document-uploader.component.css"],
})
export class DocumentUploaderComponent {
  @Input() documentPath?: string;
  @Input() documentCategory?: string;
  @Output() documentUpload = new EventEmitter<string>();

  public uploadPercentage: number = 0;

  constructor(private formFileStorage: FormFileStorageService) {}

  async uploadImage(eventTarget: EventTarget | null): Promise<void> {
    // Transform eventTarget to HTMLInputElement
    const element = eventTarget as HTMLInputElement | null;

    // Get the upload file
    const file = element?.files;

    if (!file || !this.documentPath || !this.documentCategory) return;

    const uploadTask = this.formFileStorage.uploadWithPath(file[0], uuidv4(), this.documentPath, this.documentCategory);

    this.formFileStorage.uploadPercent$?.subscribe((data) => {
      this.uploadPercentage = data.progress;
    });

    await uploadTask;
    const fileUrl = await this.formFileStorage.getDownloadURL();
    if (fileUrl) {
      this.documentUpload.emit(fileUrl);
    }
  }
}
