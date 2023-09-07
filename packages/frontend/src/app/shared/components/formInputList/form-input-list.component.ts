import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import joiValidator, { JoiSchemaBuilder } from "src/app/core/utils/validator";
import { IFormInput } from "src/app/core/models/view.types";
import { EditorComponent } from "../editor/editor.component";

@Component({
  selector: "form-input-list-component",
  template: `
    <form
      class="form-full-width"
      [formGroup]="newForm">
      <mat-form-field
        class="input-full-width"
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
            [formControlName]="input.key" />
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
            [formControlName]="input.key"></textarea>
          <mat-error *ngIf="hasError">
            {{ getError(input.key) }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'upload'">
          <mat-label>{{ input.label }}</mat-label>
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.key"
            style="display:none" />
          <document-uploader-component
            [documentPath]="input.documentPath"
            [documentCategory]="input.documentCategory"
            (documentUpload)="
              saveFile($event, input.key)
            "></document-uploader-component>
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
  @Input() formInputList: IFormInput[] = [];
  @Input() errorLocation: string = "";
  @Input() validatorSchema?: JoiSchemaBuilder<any>;
  @Input() buttonName: string = "";
  @Input() loading: boolean = false;
  @Input() haveEditor: boolean = false;
  @Output() formValue = new EventEmitter<Record<string, number | string>>();

  public newForm: UntypedFormGroup;
  private defaultFormGroupValue: Record<string, number | string> = {};
  public editorContent: string = "";
  public hasError: boolean = false;

  @ViewChild(EditorComponent) EditorComponent!: EditorComponent;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.newForm = formBuilder.group({});
  }

  ngOnInit(): void {
    // Generate default form group value
    this.formInputList.forEach((form) => {
      this.defaultFormGroupValue[form.key] = form.value;
    });

    // Create the form
    this.newForm = this.formBuilder.group(
      this.defaultFormGroupValue,
      this.validatorSchema
        ? {
            validators: joiValidator.formGroup(
              {
                errorLocation: this.errorLocation,
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

  saveFile = (filesUrl: string[], formControlName: string) => {
    // Assign the document uploaded url into form
    this.newForm.controls[formControlName].setValue(filesUrl);
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
