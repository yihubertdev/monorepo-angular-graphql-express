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
import { joiValidator } from "src/app/core/utils/validator";
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
            [formControlName]="input.formControlName" />
          <mat-error *ngIf="getError(input.formControlName) as error">
            {{ error }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'textarea'">
          <mat-label>{{ input.label }}</mat-label>
          <textarea
            matInput
            [placeholder]="input.placeholder ?? ''"
            style="height: 20dvh;"
            [formControlName]="input.formControlName"></textarea>
          <mat-error *ngIf="getError(input.formControlName) as error">
            {{ error }}
          </mat-error>
        </ng-container>

        <ng-container *ngIf="input.type === 'upload'">
          <mat-label>{{ input.label }}</mat-label>
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.formControlName"
            style="display:none" />
          <document-uploader-component
            [documentPath]="input.documentPath"
            [documentCategory]="input.documentCategory"
            (documentUpload)="
              saveFile($event, input.formControlName)
            "></document-uploader-component>
          <mat-error *ngIf="getError(input.formControlName) as error">
            {{ error }}
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
      (click)="save()">
      {{ buttonName }}
    </button>
  `,
  styleUrls: ["./form-input-list.component.css"],
})
export class FormInputListComponent implements OnInit {
  @Input() formInputList: IFormInput[] = [];
  @Input() errorLocation: string = "";
  @Input() validatorSchema: any = {};
  @Input() buttonName: string = "";
  @Input() loading: boolean = false;
  @Input() haveEditor: boolean = false;
  @Output() formValue = new EventEmitter<Record<string, number | string>>();

  newForm: UntypedFormGroup;
  defaultFormGroupValue: Record<string, number | string> = {};
  public editorContent: string = "";

  @ViewChild(EditorComponent) EditorComponent!: EditorComponent;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.newForm = formBuilder.group({});
  }

  ngOnInit(): void {
    // Generate default form group value
    this.formInputList.map((form) => {
      this.defaultFormGroupValue[form.key] = form.value;
    });

    // Create the form
    this.newForm = this.formBuilder.group(this.defaultFormGroupValue, {
      validators: joiValidator(this.errorLocation, this.validatorSchema, {
        abortEarly: false,
        allowUnknown: true,
      }),
    });
  }

  saveFile = (fileUrl: string, formControlName: string) => {
    // Assign the document uploaded url into form
    this.newForm.controls[formControlName].setValue(fileUrl);
  };

  save = () => {
    if (this.newForm.errors) {
      return;
    }

    if (this.haveEditor) {
      this.EditorComponent.exportEditorContent();
      this.newForm.value.quillEditor = this.editorContent;
    }

    this.formValue.emit(this.newForm.value);
  };

  getError(formControlName: string): string {
    const formControl = this.newForm.get(formControlName);

    if (formControl?.errors) {
      return formControl.errors[formControlName];
    }

    return "";
  }
}
