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
import {
  ICollectionQueryBuilder,
  IFormInput,
  IProfileHomeAddress,
  IUser,
  PROFILE_TITLE,
} from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../dialog/add-profile-section.dialog";
import { MatIconModule } from "@angular/material/icon";

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
    MatDialogModule,
    MatIconModule,
  ],
  template: `<mat-card class="example-card">
    <mat-card-header>
      <mat-card-title
        >{{ userDetails.title }}
        <a
          mat-button
          (click)="openDialog()">
          <mat-icon>edit</mat-icon>
        </a></mat-card-title
      >
    </mat-card-header>
    <mat-card-content *ngIf="userDetails">
      <mat-list>
        <div class="row">
          <div
            class="col-xl-4 col-lg-4
              col-md-4 col-sm-12 col-xs-12"
            *ngFor="let info of userDetails.formInputList">
            <mat-list-item>{{ info.label }} : {{ info.value }}</mat-list-item>
            <mat-divider></mat-divider>
          </div>
        </div>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent {
  @Input({ required: true }) userDetails!: IUserDetailCard<
    IUser,
    IProfileHomeAddress
  >;

  constructor(public dialog: MatDialog) {}
  ngOnChanges() {
    if (!this.userDetails) return;
    const formList = this.userDetails.formInputList;
    const userDetail = this.userDetails.details;
    formList?.forEach((list) => (list.value = (userDetail as any)[list.key]));
  }

  openDialog() {
    this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        userId: this.userDetails.userSnapshot,
        title: this.userDetails.title,
        documentId: this.userDetails.documentId,
        formInputList: this.userDetails.formInputList,
        formInputSchema: this.userDetails.formInputSchema,
      },
    });
  }
}
