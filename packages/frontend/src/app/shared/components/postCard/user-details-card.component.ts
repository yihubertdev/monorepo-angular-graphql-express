import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { ICollectionQueryBuilder, IFormInput } from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { v4 as uuidv4 } from "uuid";

export interface IUserDetailCollection<T> {
  uid: string;
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
      <mat-card-title>{{ collection?.title }}</mat-card-title>
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
    <mat-card-content *ngIf="collection">
      <div class="row">
        <div class="col">
          <ng-container *ngIf="isDisplay">
            <p *ngFor="let form of collection!.formInputList">
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
  @Output() formValue = new EventEmitter<ICollectionQueryBuilder<any>>();
  public isDisplay: boolean = false;

  save(value: any) {
    this.formValue.emit({
      documentId: this.collection!.uid,
      collectionId: this.collection!.collectionId,
      next: {
        documentId: uuidv4(),
        documentValue: value,
      },
    });
  }
}
