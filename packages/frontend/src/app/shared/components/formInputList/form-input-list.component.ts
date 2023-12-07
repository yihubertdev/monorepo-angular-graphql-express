import {
  Component,
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
import { DocumentUploadListComponent } from "./document-upload-list.component";
import { MatListModule } from "@angular/material/list";
import { DocumentUploaderComponent } from "./document-uploader.component";

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
    DocumentUploaderComponent,
  ],
  selector: "form-input-list-component",
  template: `
    <form [formGroup]="newForm">
      <ng-container *ngFor="let input of formInputList">
        <mat-form-field
          *ngIf="
            input.type === 'text' ||
            input.type === 'email' ||
            input.type === 'password' ||
            input.type === 'number'
          "
          class="mb-4"
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
          floatLabel="always"
          appearance="outline">
          <mat-label>{{ input.label }}</mat-label>
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.key"
            autocomplete="on" />
          <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
          <mat-hint>Hint</mat-hint>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'date'"
          class="mb-4"
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
          floatLabel="always"
          appearance="outline">
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
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'select'"
          class="mb-4"
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
          floatLabel="always"
          appearance="outline">
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
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'textarea'"
          class="mb-4"
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
          floatLabel="always"
          appearance="outline">
          <mat-label *ngIf="input.label">{{ input.label }}</mat-label>
          <textarea
            matInput
            [placeholder]="input.placeholder ?? ''"
            style="height: 20dvh;"
            [formControlName]="input.key"
            [mentionConfig]="'' | AddMentionUsers"></textarea>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'file'"
          class="mb-4"
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
          floatLabel="always"
          appearance="outline">
          <mat-label>{{ input.label }}</mat-label>
          <input
            style="display:none"
            [formControlName]="input.key"
            matInput />
          <ng-template #download>
            <a
              mat-button
              [href]="input.value[0]"
              target="_blank">
              View
              <mat-icon>visibility</mat-icon>
            </a>
          </ng-template>
          <ng-container *ngIf="!input.value; else download"></ng-container>
          <document-uploader-component
            [documentPath]="input.documentPath"
            [documentCategory]="input.documentCategory"
            [uploadDocumentSchema]="input.schema"
            (documentUpload)="
              saveFile($event, input.key)
            "></document-uploader-component>

          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>
      </ng-container>
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
  @Input({ required: true }) loading: boolean = false;
  @Input() haveEditor: boolean = false;
  @Output() formValue = new EventEmitter<Record<string, number | string>>();
  @Output() documentUpload = new EventEmitter<string[]>();

  public newForm!: UntypedFormGroup;
  private defaultFormGroupValue: Record<
    string,
    { value: number | string; disabled?: boolean }[]
  > = {};
  public editorContent: string = "";
  public hasError: boolean = false;

  @ViewChild(EditorComponent) EditorComponent!: EditorComponent;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
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

  saveFile = (filesUrl: string[], key: string) => {
    // Assign the document uploaded url into form
    this.newForm.controls[key].setValue(filesUrl);
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
}
