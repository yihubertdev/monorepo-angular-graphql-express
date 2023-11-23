import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IUploadMultipleFileRes } from "../../../core/services/fireStorage/basic.bucket";
import { FormFileStorageService } from "../../../core/services/fireStorage/form-file.bucket";
import { v4 as uuidv4 } from "uuid";
import { MatListModule } from "@angular/material/list";
import { DocumentUploadListComponent } from "./document-upload-list.component";
import { NgFor, NgIf } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import * as Joi from "joi";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [
    NgIf,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    DocumentUploadListComponent,
    NgFor,
    MatFormFieldModule,
  ],
  providers: [FormFileStorageService],
  selector: "document-uploader-component",
  template: `
    <input
      style="display:none"
      type="file"
      matinput
      multiple
      #uploadProfile
      (change)="uploadImage($event.target)" />
    <a
      mat-button
      (click)="uploadProfile.click()">
      Upload
      <mat-icon>upload</mat-icon>
    </a>
    <mat-error *ngIf="error">
      {{ error }}
    </mat-error>
    <mat-list
      role="list"
      *ngFor="let task of tasks">
      <mat-list-item role="listitem">
        <document-upload-list-component
          [documentPercent$]="task.uploadPercent"
          [documentName]="task.file.name"
          [storageRef]="task.storageRef"
          [task]="task.task"
          (urlEmitter)="saveImage($event)"></document-upload-list-component>
      </mat-list-item>
    </mat-list>
  `,
})
export class DocumentUploaderComponent {
  @Input() documentPath?: string;
  @Input() documentCategory?: string;
  @Input() uploadDocumentSchema?: Joi.ObjectSchema | Joi.ArraySchema;
  @Output() documentUpload = new EventEmitter<string[]>();

  public uploadPercentage: number = 0;
  public tasks?: IUploadMultipleFileRes[];
  public urls: string[] = [];
  public error?: any;

  private fileCount: number = 0;
  constructor(private formFileStorage: FormFileStorageService) {}

  public uploadImage(eventTarget: EventTarget | null): void {
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

    this.fileCount = fileList.length;

    if (this.uploadDocumentSchema) {
      this.error = this.uploadDocumentSchema.validate(
        Array.from(fileList).map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
        {
          allowUnknown: true,
        }
      ).error;
    }
    if (!this.error) {
      this.tasks = this.formFileStorage.uploadMultiple(
        Array.from(fileList).map((file) => ({
          id: uuidv4(),
          file,
        })),
        this.documentPath,
        this.documentCategory
      );
    }
    return;
  }

  public saveImage(url: any): void {
    this.urls.push(url);

    if (this.urls.length == this.fileCount) {
      this.documentUpload.emit(this.urls);
    }
  }
}
