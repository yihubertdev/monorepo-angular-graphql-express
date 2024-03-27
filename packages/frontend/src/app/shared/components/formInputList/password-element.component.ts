import { NgClass, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ControlContainer, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormErrorPipe } from "../../pipes/form-error.pipe";
import { FormElementComponent } from "./base-form-element.component";

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgClass,
    MatFormFieldModule,
    MatIconModule,
    NgIf,
    FormErrorPipe,
  ],
  selector: "password-form-component",
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <mat-form-field
      class="mb-2 p-1"
      [ngClass]="
        'col-xl-' +
        formElement.column.xl +
        ' col-lg-' +
        formElement.column.lg +
        ' col-md-' +
        formElement.column.md +
        ' col-sm-' +
        formElement.column.sm +
        ' col-' +
        formElement.column.xs
      "
      appearance="outline">
      <mat-label>{{ formElement.label }}</mat-label>
      <mat-icon
        matSuffix
        (click)="(!isHide)"
        >visibility</mat-icon
      >
      <input
        [type]="formElement.type"
        matInput
        [formControlName]="formElement.key"
        autocomplete="on" />
      <mat-hint>Enter Password</mat-hint>
      <mat-error>
        {{ formElement.key | formError: form }}
      </mat-error>
    </mat-form-field>
  `,
})
export class PasswordElementComponent extends FormElementComponent {}
