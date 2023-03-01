import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { joiValidator } from "src/app/core/utils/validator";
import { IFormInput } from "src/app/core/models/view.types";

@Component({
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
export class FormInputListComponent implements OnInit {
  @Input() formInputList: IFormInput[] = [];
  @Input() errorLocation: string = "";
  @Input() validatorSchema: any = {};
  @Input() buttonName: string = "";
  @Output() formValue = new EventEmitter<Record<string, number | string>>();
  newForm: FormGroup;
  defaultFormGroupValue: Record<string, number | string> = {};

  constructor(private formBuilder: FormBuilder) {
    this.newForm = formBuilder.group({});
  }

  ngOnInit(): void {
    // Generate default form group value
    this.formInputList.map((form) => {
      this.defaultFormGroupValue[form.key] = form.value;
    });

    // Create the form
    this.newForm = this.formBuilder.group(this.defaultFormGroupValue, {
      validators: joiValidator(this.errorLocation, this.validatorSchema),
    });
  }

  save = () => {
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
