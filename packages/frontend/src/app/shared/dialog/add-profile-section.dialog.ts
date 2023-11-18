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
        [formInputList]="data.formList"
        errorLocation="AuthModule.YourAccountController"
        [validatorSchema]="data.formSchema"
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
      documentId: string;
      collection: string;
      category: string;
      title: string;
      formList: IFormInput[];
      formSchema: JoiSchemaBuilder<any>;
    }
  ) {
    dialogRef.disableClose = true;
  }

  save(value: any) {
    this._userService.createSubCollectionByUser(this.data.user, {
      collectionId: this.data.collection,
      next: {
        documentId: this.data.documentId,
        documentValue: { category: this.data.category, ...value },
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
