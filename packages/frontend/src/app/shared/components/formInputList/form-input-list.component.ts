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
import { AddMentionUsersPipe } from "../../pipes/string-tranform.pipe";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { DocumentUploadListComponent } from "./document-upload-list.component";
import { MatListModule } from "@angular/material/list";
import { DocumentUploaderComponent } from "./document-uploader.component";
import { IForm } from "src/app/core/static/form.static";

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
      <ng-container *ngFor="let input of list">
        <mat-form-field
          *ngIf="
            input.type === 'text' ||
            input.type === 'email' ||
            input.type === 'password' ||
            input.type === 'number'
          "
          class="mb-2 p-1"
          [ngClass]="
            'col-xl-' +
            input.column.xl +
            ' col-lg-' +
            input.column.lg +
            ' col-md-' +
            input.column.md +
            ' col-sm-' +
            input.column.sm +
            ' col-' +
            input.column.xs
          "
          floatLabel="always"
          appearance="outline">
          <mat-label>{{ input.label }}</mat-label>
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.key"
            autocomplete="on" />
          <mat-icon matSuffix>{{ input.icon }}</mat-icon>
          <mat-hint>{{ input.hint }}</mat-hint>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'date'"
          class="mb-2 p-1"
          [ngClass]="
            'col-xl-' +
            input.column.xl +
            ' col-lg-' +
            input.column.lg +
            ' col-md-' +
            input.column.md +
            ' col-sm-' +
            input.column.sm +
            ' col-' +
            input.column.xs
          "
          floatLabel="always"
          appearance="outline">
          <mat-label>{{ input.label }}</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            [formControlName]="input.key" />
          <mat-hint>{{ input.hint }}</mat-hint>
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
          class="mb-2 p-1"
          [ngClass]="
            'col-xl-' +
            input.column.xl +
            ' col-lg-' +
            input.column.lg +
            ' col-md-' +
            input.column.md +
            ' col-sm-' +
            input.column.sm +
            ' col-' +
            input.column.xs
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
          <mat-icon matSuffix>{{ input.icon }}</mat-icon>
          <mat-hint>{{ input.hint }}</mat-hint>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'textarea'"
          class="mb-2 p-1"
          [ngClass]="
            'col-xl-' +
            input.column.xl +
            ' col-lg-' +
            input.column.lg +
            ' col-md-' +
            input.column.md +
            ' col-sm-' +
            input.column.sm +
            ' col-' +
            input.column.xs
          "
          floatLabel="always"
          appearance="outline">
          <mat-label *ngIf="input.label">{{ input.label }}</mat-label>
          <textarea
            matInput
            style="height: 20dvh;"
            [formControlName]="input.key"
            [mentionConfig]="'' | AddMentionUsers"></textarea>
          <mat-icon matSuffix>{{ input.icon }}</mat-icon>
          <mat-hint>{{ input.hint }}</mat-hint>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>

        <mat-form-field
          *ngIf="input.type === 'file'"
          class="mb-2 p-1"
          [ngClass]="
            'col-xl-' +
            input.column.xl +
            ' col-lg-' +
            input.column.lg +
            ' col-md-' +
            input.column.md +
            ' col-sm-' +
            input.column.sm +
            ' col-' +
            input.column.xs
          "
          floatLabel="always"
          appearance="outline">
          <mat-label>{{ input.label }}</mat-label>
          <input
            style="display:none"
            [formControlName]="input.key"
            matInput />
          @if (input.value) {
            <a
              *ngIf="input.value.length !== 0"
              mat-button
              [href]="input.value[0]"
              target="_blank">
              View
              <mat-icon>visibility</mat-icon>
            </a>
          }
          <document-uploader-component
            [documentPath]="input.documentPath"
            [documentCategory]="input.documentCategory"
            [uploadDocumentSchema]="input.schema"
            (documentUpload)="
              saveFile($event, input.key)
            "></document-uploader-component>
          <mat-icon matSuffix>{{ input.icon }}</mat-icon>
          <mat-hint>{{ input.hint }}</mat-hint>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </mat-form-field>
      </ng-container>
    </form>
    <div
      *ngIf="haveEditor"
      class="mb-2 p-1">
      <editor-component [(editorContent)]="editorContent"></editor-component>
    </div>
    <button
      type="submit"
      [class.spinner]="loading"
      [disabled]="loading"
      mat-fab
      extended
      color="primary"
      class="btn-full-width"
      (click)="submit()">
      {{ buttonName }}
    </button>
  `,
  styleUrls: ["./form-input-list.component.css"],
})
export class FormInputListComponent implements OnInit {
  @Input({ required: true }) list!: IForm[];
  @Input({ required: true }) schema!: JoiSchemaBuilder;
  @Input({ required: true }) buttonName!: string;
  @Input({ required: true }) loading!: boolean;
  @Input() haveEditor: boolean = false;
  @Output() formValue = new EventEmitter<
    Record<string, number | string | string[]>
  >();
  @Output() documentUpload = new EventEmitter<string[]>();

  public newForm!: UntypedFormGroup;
  private defaultFormGroupValue: Record<
    string,
    { value: number | string | string[]; disabled?: boolean }[]
  > = {};
  public editorContent: string = "";
  public hasError: boolean = false;

  @ViewChild(EditorComponent) EditorComponent!: EditorComponent;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    // Generate default form group value
    this.list.forEach((form) => {
      this.defaultFormGroupValue[form.key] = [
        { value: form.value, disabled: form.disabled },
      ];
    });
    // Create the form
    this.newForm = this.formBuilder.group(
      this.defaultFormGroupValue,
      this.schema
        ? {
            validators: joiValidator.formGroup(
              {
                schema: this.schema,
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
