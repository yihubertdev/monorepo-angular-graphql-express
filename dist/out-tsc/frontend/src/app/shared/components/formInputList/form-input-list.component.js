"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInputListComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const validator_1 = require("src/app/core/utils/validator");
const editor_component_1 = require("../editor/editor.component");
let FormInputListComponent = class FormInputListComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.formInputList = [];
        this.errorLocation = "";
        this.validatorSchema = {};
        this.buttonName = "";
        this.loading = false;
        this.haveEditor = false;
        this.formValue = new core_1.EventEmitter();
        this.defaultFormGroupValue = {};
        this.editorContent = "";
        this.saveFile = (fileUrl, formControlName) => {
            // Assign the document uploaded url into form
            this.newForm.controls[formControlName].setValue(fileUrl);
        };
        this.save = () => {
            if (this.newForm.errors) {
                return;
            }
            if (this.haveEditor) {
                this.EditorComponent.exportEditorContent();
                this.newForm.value.quillEditor = this.editorContent;
            }
            this.formValue.emit(this.newForm.value);
        };
        this.newForm = formBuilder.group({});
    }
    ngOnInit() {
        // Generate default form group value
        this.formInputList.map((form) => {
            this.defaultFormGroupValue[form.key] = form.value;
        });
        // Create the form
        this.newForm = this.formBuilder.group(this.defaultFormGroupValue, {
            validators: (0, validator_1.joiValidator)(this.errorLocation, this.validatorSchema, {
                abortEarly: false,
                allowUnknown: true,
            }),
        });
    }
    getError(formControlName) {
        const formControl = this.newForm.get(formControlName);
        if (formControl?.errors) {
            return formControl.errors[formControlName];
        }
        return "";
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "formInputList", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "errorLocation", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "validatorSchema", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "buttonName", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "loading", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], FormInputListComponent.prototype, "haveEditor", void 0);
tslib_1.__decorate([
    (0, core_1.Output)()
], FormInputListComponent.prototype, "formValue", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(editor_component_1.EditorComponent)
], FormInputListComponent.prototype, "EditorComponent", void 0);
FormInputListComponent = tslib_1.__decorate([
    (0, core_1.Component)({
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
], FormInputListComponent);
exports.FormInputListComponent = FormInputListComponent;
//# sourceMappingURL=form-input-list.component.js.map