import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { IUser, SETTING_CATEGORY } from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { MatIconModule } from "@angular/material/icon";
import { RemoveSettingCategoryDialog } from "../../dialog/remove-setting-category.dialog";
import { MatButtonModule } from "@angular/material/button";
import { IForm } from "src/app/core/static/form.static";

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
    MatCardModule,
    FormInputListComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: ` <a
      *ngIf="!noEdit"
      mat-button
      (click)="
        remove({
          documentId: settingDetail.documentId,
          category,
          title
        })
      "
      style="margin-left: auto; display: table;">
      Remove
      <mat-icon>delete</mat-icon> </a
    ><mat-card>
      <mat-card-content>
        <form-input-list-component
          [list]="formList"
          [schema]="schema"
          buttonName="Save"
          (formValue)="save($event)"
          [loading]="loading"></form-input-list-component>
      </mat-card-content>
    </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
  @Input({ required: true }) collection!: string;
  @Input({ required: true }) settingDetail!: IUserDetailCard;
  @Input({ required: true }) user!: QueryDocumentSnapshot<IUser>;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) formList!: IForm[];
  @Input({ required: true }) schema!: JoiSchemaBuilder;
  @Input({ required: true }) noEdit?: boolean;

  public loading: boolean = false;
  columns = {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6,
  };
  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnChanges() {
    this.formList.forEach(
      (list) => (list.value = this.settingDetail.details[list.key])
    );
  }

  save(value: any) {
    this.loading = true;
    const user = this._authService.getAuth();
    if (!user) return;
    switch (this.category) {
      case SETTING_CATEGORY.ACCOUNT:
        this._authService.updateUserInfo({
          displayName: value.displayName,
        });

        break;
      case SETTING_CATEGORY.BIOGRAPHY:
        this._userService.update({
          document: {
            description: value.biography,
          },
          uid: user.uid,
        });

        break;
      default:
        this._userService.createSubCollectionByUser(this.user, {
          collectionId: this.collection,
          next: {
            documentId: this.settingDetail.documentId,
            documentValue: { category: this.category, ...value },
          },
        });
        break;
    }
    this.loading = false;
    throw new Error("Networth saved successfully.");
  }

  remove({
    documentId,
    category,
    title,
  }: {
    documentId?: string;
    category: string;
    title: string;
  }) {
    if (!documentId) return;
    const dialogRef = this.dialog.open(RemoveSettingCategoryDialog, {
      disableClose: true,
      data: {
        title,
        category,
        documentId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const { documentId } = result;
      this._userService.deleteSubCollectionDocumentByUser(this.user, {
        collectionId: this.collection,
        next: {
          documentId,
        },
      });

      // each category only have one object, each object have multiple data
      // this.groupedSettings[category][0].data = this.groupedSettings[
      //   category
      // ][0].data.filter((item) => item.documentId != documentId);
      throw new Error("Networth saved successfully.");
    });
  }
}
