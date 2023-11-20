import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { IFormInput, IUser } from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../dialog/add-profile-section.dialog";
import { MatIconModule } from "@angular/material/icon";
import { FormInputListComponent } from "../formInputList/form-input-list.component";

export interface IUserDetailCard {
  details: any;
  documentId?: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "user-details-card-component",
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    FormInputListComponent,
  ],
  template: `<mat-card *ngIf="userDetails">
    <mat-card-content>
      <form-input-list-component
        [columns]="columns"
        [formInputList]="formList"
        errorLocation="AuthModule.YourAccountController"
        [validatorSchema]="formSchema!"
        buttonName="Save"
        (formValue)="save($event)"></form-input-list-component>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
  @Input({ required: true }) userDetails!: IUserDetailCard;
  @Input({ required: true }) user!: QueryDocumentSnapshot<IUser>;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) formList!: IFormInput[];
  @Input({ required: true }) formSchema?: JoiSchemaBuilder<any>;
  @Input() isSettingsPage?: boolean;

  @Output() removeChange = new EventEmitter<{
    documentId: string;
    category: string;
    title: string;
  }>();

  columns = {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6,
  };
  constructor(public dialog: MatDialog) {}

  ngOnChanges() {
    this.formList.forEach(
      (list) => (list.value = this.userDetails.details[list.key])
    );
  }

  openDialog() {
    this.formList.forEach(
      (list) => (list.value = this.userDetails.details[list.key])
    );
    this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        user: this.user,
        category: this.category,
        title: this.title,
        documentId: this.userDetails.documentId,
        formList: this.formList,
        formSchema: this.formSchema,
      },
    });
  }

  remove(value: { documentId: string; category: string; title: string }) {
    this.removeChange.emit(value);
  }

  save(value: any) {
    // this._userService.createSubCollectionByUser(this.data.user, {
    //   collectionId: this.data.collection,
    //   next: {
    //     documentId: this.data.documentId,
    //     documentValue: { category: this.data.category, ...value },
    //   },
    // });
    // this.dialogRef.close();
    // this.formValue.emit({
    //   collectionId: "userProfile",
    //   next: {
    //     documentId: this.userDetails!.documentId, // profile category id, such as home address, education
    //     documentValue: { title: this.userDetails?.title, ...value },
  }
}
