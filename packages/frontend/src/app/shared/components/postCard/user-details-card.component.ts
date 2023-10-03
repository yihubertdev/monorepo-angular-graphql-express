import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { IFormInput } from "sources-types";
import { JoiSchemaBuilder } from "src/app/core/utils/validator";

export interface IUserDetailCollection<T> {
  userId: string;
  title: string;
  collectionId: string;
  formInputList: IFormInput[];
  formInputSchema: JoiSchemaBuilder<T>;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "user-details-card",
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    FormInputListComponent,
  ],
  template: `<mat-card class="example-card">
    <mat-card-header>
      <mat-card-title>{{ collection!.title }}</mat-card-title>
    </mat-card-header>
    <mat-card-actions>
      <button
        mat-button
        (click)="isDisplay = true">
        Display
      </button>
      <button
        mat-button
        (click)="isDisplay = false">
        Edit
      </button>
    </mat-card-actions>
    <mat-card-content>
      <div class="row">
        <div class="col">
          <ng-container *ngIf="isDisplay">
            <p *ngFor="let form of collection?.formInputList">
              {{ form.label }}: {{ form.value }}
            </p>
          </ng-container>
          <form-input-list-component
            *ngIf="!isDisplay"
            [formInputList]="collection!.formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="collection!.formInputSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </div>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent {
  @Input({ required: true }) collection?: IUserDetailCollection<any>;
  public isDisplay: boolean = false;

  constructor(private _ref: ChangeDetectorRef) {}

  save(value: any) {
    console.log(value);
  }
}
