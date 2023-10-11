import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import {
  ICollectionQueryBuilder,
  IFormInput,
  IProfileHomeAddress,
  IUser,
} from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";

export interface IUserDetailCard<T, S> {
  userSnapshot: QueryDocumentSnapshot<T>;
  details: S;
  title: string;
  documentId: string;
  formInputList: IFormInput[];
  formInputSchema: JoiSchemaBuilder<S>;
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
    MatDividerModule,
    MatListModule,
    FormInputListComponent,
  ],
  template: `<mat-card class="example-card">
    <mat-card-header>
      <mat-card-title>{{ userDetails?.title }}</mat-card-title>
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
    <mat-card-content *ngIf="userDetails">
      <div class="row">
        <div class="col">
          <ng-container *ngIf="isDisplay">
            <mat-list>
              <ng-container *ngFor="let info of userDetails.formInputList">
                <mat-divider></mat-divider>
                <mat-list-item
                  >{{ info.label }} : {{ info.value }}</mat-list-item
                >
              </ng-container>
            </mat-list>
          </ng-container>
          <form-input-list-component
            *ngIf="!isDisplay"
            [formInputList]="userDetails!.formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="userDetails!.formInputSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </div>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent {
  @Input({ required: true }) userDetails?: IUserDetailCard<
    IUser,
    IProfileHomeAddress
  >;
  @Output() formValue = new EventEmitter<ICollectionQueryBuilder<any>>();
  public isDisplay: boolean = true;

  ngOnChanges() {
    if (!this.userDetails) return;
    const formList = this.userDetails.formInputList;
    const userDetail = this.userDetails.details;
    formList?.forEach((list) => (list.value = (userDetail as any)[list.key]));
  }

  save(value: any) {
    this.formValue.emit({
      collectionId: "userProfile",
      next: {
        documentId: this.userDetails!.documentId, // profile category id, such as home address, education
        documentValue: { title: this.userDetails?.title, ...value },
      },
    });
  }
}
