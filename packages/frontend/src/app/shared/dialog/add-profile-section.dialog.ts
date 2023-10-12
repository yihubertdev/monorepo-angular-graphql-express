import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormInputListComponent } from "../components/formInputList/form-input-list.component";
import { IFormInput, IUser } from "sources-types";
import { JoiSchemaBuilder } from "../../core/utils/validator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    FormInputListComponent,
    MatButtonModule,
    MatIconModule,
  ],
  template: ` <h1 mat-dialog-title>
      {{ data.title }}
      <a
        mat-button
        mat-dialog-close>
        Close
        <mat-icon>close</mat-icon>
      </a>
    </h1>
    <div mat-dialog-content>
      <form-input-list-component
        [formInputList]="data.formInputList"
        errorLocation="AuthModule.YourAccountController"
        [validatorSchema]="data.formInputSchema"
        buttonName="Save"
        (formValue)="save($event)"></form-input-list-component>
    </div>`,
  styleUrls: [],
})
export class AddProfileSectionDialog {
  public loading: boolean = false;
  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<AddProfileSectionDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: QueryDocumentSnapshot<IUser>;
      title: string;
      documentId: string;
      formInputList: IFormInput[];
      formInputSchema: JoiSchemaBuilder<any>;
    }
  ) {
    dialogRef.disableClose = true;
  }

  save(value: any) {
    this._userService.addSubCollectionByUserId(this.data.user, {
      collectionId: "userProfile",
      next: {
        documentId: this.data.documentId,
        documentValue: { title: this.data.title, ...value },
      },
    });
    this.dialogRef.close();
    // this.formValue.emit({
    //   collectionId: "userProfile",
    //   next: {
    //     documentId: this.userDetails!.documentId, // profile category id, such as home address, education
    //     documentValue: { title: this.userDetails?.title, ...value },
  }
}
