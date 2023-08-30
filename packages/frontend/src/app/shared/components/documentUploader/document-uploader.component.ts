import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IUploadMultipleFileRes } from "src/app/core/services/fireStorage/basic.bucket";
import { FormFileStorageService } from "src/app/core/services/fireStorage/form-file.bucket";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "document-uploader-component",
  template: ` <section style="display: block">
    <input
      type="file"
      matinput
      multiple
      (change)="uploadImage($event.target)" />

    <mat-list
      role="list"
      *ngFor="let task of tasks">
      <mat-list-item role="listitem">
        <document-upload-list-component
          [documentPercent$]="task.uploadPercent"
          [documentName]="task.file.name"
          [storageRef]="task.storageRef"
          (urlEmitter)="saveImage($event)"></document-upload-list-component>
      </mat-list-item>
    </mat-list>
  </section>`,
  styleUrls: ["./document-uploader.component.css"],
})
export class DocumentUploaderComponent {
  @Input() documentPath?: string;
  @Input() documentCategory?: string;
  @Output() documentUpload = new EventEmitter<string[]>();

  public uploadPercentage: number = 0;
  public tasks?: IUploadMultipleFileRes[];
  public urls: string[] = [];

  constructor(private formFileStorage: FormFileStorageService) {}

  uploadImage(eventTarget: EventTarget | null): void {
    // Transform eventTarget to HTMLInputElement
    const element = eventTarget as HTMLInputElement | null;

    // Get the upload file
    const fileList = element?.files;
    if (
      !fileList ||
      !fileList.length ||
      !this.documentPath ||
      !this.documentCategory
    )
      return;

    this.tasks = this.formFileStorage.uploadMultiple(
      Array.from(fileList).map((file) => ({
        id: uuidv4(),
        file,
      })),
      this.documentPath,
      this.documentCategory
    );

    return;
    // const uploadTask = this.formFileStorage.uploadWithPath(
    //   file[0],
    //   uuidv4(),
    //   this.documentPath,
    //   this.documentCategory
    // );

    // this.formFileStorage.uploadPercent$?.subscribe((data) => {
    //   this.uploadPercentage = data.progress;
    // });

    // await uploadTask;
    // const fileUrl = await this.formFileStorage.getDownloadURL();
    // if (fileUrl) {
    //   this.documentUpload.emit(fileUrl);
    // }
  }

  saveImage(url: any) {
    this.urls.push(url);
  }
}
