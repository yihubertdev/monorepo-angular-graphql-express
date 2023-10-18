"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInputListComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const validator_1 = require("src/app/core/utils/validator");
let FormInputListComponent = class FormInputListComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.formInputList = [];
        this.errorLocation = "";
        this.validatorSchema = {};
        this.buttonName = "";
        this.formValue = new core_1.EventEmitter();
        this.defaultFormGroupValue = {};
        this.save = () => {
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
            validators: (0, validator_1.joiValidator)(this.errorLocation, this.validatorSchema),
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
    (0, core_1.Output)()
], FormInputListComponent.prototype, "formValue", void 0);
FormInputListComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "form-input-list-component",
        template: `
    <form
      class="example-form"
      [formGroup]="newForm">
      <mat-form-field
        class="input-full-width"
        appearance="fill"
        *ngFor="let input of formInputList">
        <mat-label>{{ input.label }}</mat-label>
        <ng-container *ngIf="input.type !== 'select' || 'textarea'">
          <input
            [type]="input.type"
            matInput
            [formControlName]="input.formControlName" />
          <mat-error *ngIf="getError(input.formControlName) as error">
            {{ error }}
          </mat-error>
        </ng-container>
      </mat-form-field>

      <button
        type="submit"
        mat-raised-button
        color="primary"
        style="width: 100vw;"
        (click)="save()">
        {{ buttonName }}
      </button>
    </form>
  `,
        styleUrls: ["./post-card.component.css"],
    })
], FormInputListComponent);
exports.FormInputListComponent = FormInputListComponent;
//# sourceMappingURL=post-card.component.js.map