import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import joiValidator, { JoiSchemaBuilder } from "../../../core/utils/validator";
import { EditorComponent } from "./editor.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MentionModule } from "angular-mentions";
import { IColumnSet } from "sources-types";
import { IFormUploaderInput } from "src/app/core/static/auth.static";
import { AddMentionUsersPipe } from "../../pipes/string-tranform.pipe";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { IUploadMultipleFileRes } from "src/app/core/services/fireStorage/basic.bucket";
import { FormFileStorageService } from "src/app/core/services/fireStorage/form-file.bucket";
import { v4 as uuidv4 } from "uuid";
import * as Joi from "joi";
import { DocumentUploadListComponent } from "./document-upload-list.component";
import { MatListModule } from "@angular/material/list";

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    NgTemplateOutlet,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    DocumentUploadListComponent,
    EditorComponent,
    MentionModule,
    AddMentionUsersPipe,
    AsyncPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    DocumentUploadListComponent,
    MatListModule,
  ],
  selector: "form-input-list-component",
  template: `
    <form [formGroup]="newForm">
      <mat-form-field
        [ngClass]="
          'col-xl-' +
          columns.xl +
          ' col-lg-' +
          columns.lg +
          ' col-md-' +
          columns.md +
          ' col-sm-' +
          columns.sm +
          ' col-' +
          columns.xs
        "
        style="width: 100%;"
        appearance="fill"
        *ngFor="let input of formInputList">
        <ng-container
          *ngIf="
            input.type === 'text' ||
            input.type === 'email' ||
            input.type === 'password'
          ">
          <mat-label>{{ input.label }}</mat-label>
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.key"
            autocomplete="on" />
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'date'">
          <mat-label>{{ input.label }}</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            [formControlName]="input.key" />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle
            matIconSuffix
            [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'select'">
          <mat-label>{{ input.label }}</mat-label>
          <mat-select [formControlName]="input.key">
            <mat-option
              *ngFor="let select of input.selection"
              [value]="select"
              >{{ select }}</mat-option
            >
          </mat-select>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'textarea'">
          <mat-label *ngIf="input.label">{{ input.label }}</mat-label>
          <textarea
            matInput
            [placeholder]="input.placeholder ?? ''"
            style="height: 20dvh;"
            [formControlName]="input.key"
            [mentionConfig]="
              (mentionConfig | AddMentionUsers | async)!
            "></textarea>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'upload'">
          <mat-label>{{ input.label }}</mat-label>
          <input
            style="display:none"
            [type]="input.type"
            [formControlName]="input.key"
            matInput
            multiple
            id="uploadProfile"
            (change)="
              uploadImage(
                $event.target,
                input.documentPath!,
                input.documentCategory!,
                input.schema!
              )
            " />
          <a
            mat-button
            (click)="uploadProfile.nativeElement.click()"
            target="_blank">
            Upload
            <mat-icon>upload</mat-icon>
          </a>
          <mat-error *ngIf="error">
            {{ error }}
          </mat-error>
          <!--multiple files can be upload in each input section-->
          <mat-list
            role="list"
            *ngFor="let task of tasks">
            <mat-list-item role="listitem">
              <document-upload-list-component
                [documentPercent$]="task.uploadPercent"
                [documentName]="task.file.name"
                [storageRef]="task.storageRef"
                [task]="task.task"
                (urlEmitter)="
                  saveFile($event, input.key)
                "></document-upload-list-component>
            </mat-list-item>
          </mat-list>
          <ng-template #download>
            <a
              mat-button
              [href]="input.value[0]"
              target="_blank">
              Download
              <mat-icon>download</mat-icon>
            </a>
          </ng-template>
          <ng-container *ngIf="!input.value; else download"></ng-container>

          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>
      </mat-form-field>
    </form>
    <div
      *ngIf="haveEditor"
      style="margin-bottom: 4%">
      <editor-component [(editorContent)]="editorContent"></editor-component>
    </div>
    <button
      type="submit"
      [class.spinner]="loading"
      [disabled]="loading"
      mat-raised-button
      color="primary"
      class="btn-full-width"
      (click)="submit()">
      {{ buttonName }}
    </button>
  `,
  styleUrls: ["./form-input-list.component.css"],
})
export class FormInputListComponent implements OnInit {
  @Input({ required: false }) columns: IColumnSet = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };
  @Input({ required: true }) formInputList!: IFormUploaderInput[];
  @Input({ required: true }) validatorSchema!: JoiSchemaBuilder<any>;
  @Input() buttonName: string = "";
  @Input() loading: boolean = false;
  @Input() haveEditor: boolean = false;
  @Output() formValue = new EventEmitter<Record<string, number | string>>();
  @Output() documentUpload = new EventEmitter<string[]>();
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;

  public newForm!: UntypedFormGroup;
  private defaultFormGroupValue: Record<
    string,
    { value: number | string; disabled?: boolean }[]
  > = {};
  public editorContent: string = "";
  public hasError: boolean = false;
  public mentionConfig = {};

  public error?: any;
  public uploadPercentage: number = 0;
  public tasks?: IUploadMultipleFileRes[];
  public urls: string[] = [];
  private fileCount: number = 0;

  @ViewChild(EditorComponent) EditorComponent!: EditorComponent;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private formFileStorage: FormFileStorageService
  ) {}

  async ngOnInit() {
    // Generate default form group value
    this.formInputList.forEach((form) => {
      this.defaultFormGroupValue[form.key] = [
        { value: form.value, disabled: form.disabled },
      ];
    });
    // Create the form
    this.newForm = this.formBuilder.group(
      this.defaultFormGroupValue,
      this.validatorSchema
        ? {
            validators: joiValidator.formGroup(
              {
                schemaGenerator: this.validatorSchema,
              },
              {
                abortEarly: false,
                allowUnknown: true,
              }
            ),
          }
        : {}
    );
  }

  saveFile = (url: string | null, key: string) => {
    if (!url) return;
    this.urls.push(url);

    if (this.urls.length == this.fileCount) {
      // Assign the document uploaded url into form
      this.newForm.controls[key].setValue(url);
    }
  };

  submit = () => {
    if (this.newForm.errors) {
      this.hasError = true;
      return;
    }

    if (this.haveEditor) {
      this.EditorComponent.exportEditorContent();
      this.newForm.value.quillEditor = this.editorContent;
    }

    this.formValue.emit(this.newForm.value);
  };

  /**
   * @param {string} key get error by key
   * @returns {string} return the error message
   */
  getError(key: string): string {
    const formControl = this.newForm.get(key);

    if (formControl?.errors) {
      return formControl.errors[key];
    }

    return "";
  }

  public uploadImage(
    eventTarget: EventTarget | null,
    documentPath: string,
    documentCategory: string,
    uploadDocumentSchema: Joi.ObjectSchema | Joi.ArraySchema
  ): void {
    // Transform eventTarget to HTMLInputElement
    const element = eventTarget as HTMLInputElement | null;
    // Get the upload file
    const fileList = element?.files;
    if (!fileList || !fileList.length || !documentPath || !documentCategory)
      return;

    this.fileCount = fileList.length;

    this.error = uploadDocumentSchema.validate(
      Array.from(fileList).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      {
        allowUnknown: true,
      }
    ).error;

    if (!this.error) {
      this.tasks = this.formFileStorage.uploadMultiple(
        Array.from(fileList).map((file) => ({
          id: uuidv4(),
          file,
        })),
        documentPath,
        documentCategory
      );
    }
    return;
  }
}
