import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { IUser, SETTING_CATEGORY } from "sources-types";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { UserService } from "../../../core/services/fireStore/users.firestore";
import { AuthService } from "../../../core/services/fireAuth/auth";
import { MatIconModule } from "@angular/material/icon";
import { RemoveSettingCategoryDialog } from "../../dialog/remove-setting-category.dialog";
import { MatButtonModule } from "@angular/material/button";
import { SuccessMessage } from "../../../core/utils/error";
import { IUserSettings } from "../../../feature/userProfile/user-details-settings.controller";
import { NetWorthService } from "../../../core/services/fireStore/networth.firestore";
import { INetWorth, NETWORTH_VALUE } from "src/app/core/static/form.static";

export interface IUserDetailCard {
  details: any;
  documentId?: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "user-details-card-component",
  imports: [
    MatCardModule,
    FormInputListComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `<mat-card class="mt-2 mb-2">
    @if (category.type !== "BASIC_INFORMATION") {
      <mat-card-actions>
        <button
          mat-button
          (click)="
            remove({
              documentId: data.documentId,
              category: category.category,
              title: category.title
            })
          ">
          Remove<mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    }

    <mat-card-content>
      <form-input-list-component
        [list]="category.list"
        [schema]="category.schema"
        buttonName="Save"
        (formValue)="save($event)"
        [loading]="loading"></form-input-list-component>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
  @Input({ required: true }) collection!: string;
  @Input({ required: true }) user!: QueryDocumentSnapshot<IUser>;
  @Input({ required: true }) category!: IUserSettings;
  @Input({ required: true }) data!: IUserDetailCard;

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
    private _authService: AuthService,
    private _netWorthService: NetWorthService
  ) {}

  ngOnChanges() {
    this.category.list.forEach(
      (list) => (list.value = this.data.details[list.key])
    );
  }

  async save(value: any) {
    console.log(value);
    this.loading = true;
    const user = this._authService.getAuth();
    if (!user) return;

    switch (this.category.category) {
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
      case SETTING_CATEGORY.TAX_SHELTERED_INVESTMENT:
      case SETTING_CATEGORY.MARKABLE_SECURITY:
        const marketValue =
          this.category.data
            .filter((item) => item.documentId !== this.data.documentId)
            .map((item) => Number(item.details.marketValue))
            .reduce((sum, current) => sum + current, 0) +
          Number(value.marketValue);
        await Promise.all([
          this._netWorthService.create({
            id: this.user.id,
            document: {
              [this.category.category]: {
                [NETWORTH_VALUE.MARKET_VALUE]: marketValue,
                [NETWORTH_VALUE.EQUITY]: marketValue,
              },
            } as INetWorth,
          }),
          this._userService.createSubCollectionByUser(this.user, {
            collectionId: this.collection,
            next: {
              documentId: this.data.documentId,
              documentValue: { category: this.category.category, ...value },
            },
          }),
        ]);
        break;

      case SETTING_CATEGORY.INSURANCE:
        await Promise.all([
          this._netWorthService.create({
            id: this.user.id,
            document: {
              [this.category.category]: {
                [NETWORTH_VALUE.FACE_VALUE]:
                  this.category.data
                    .filter((item) => item.documentId !== this.data.documentId)
                    .map((item) => Number(item.details.faceValue))
                    .reduce((sum, current) => sum + current, 0) +
                  Number(value.faceValue),
                [NETWORTH_VALUE.CSV]:
                  this.category.data
                    .filter((item) => item.documentId !== this.data.documentId)
                    .map((item) => Number(item.details.cashSurrenderValue))
                    .reduce((sum, current) => sum + current, 0) +
                  Number(value.cashSurrenderValue),
              },
            } as INetWorth,
          }),
          this._userService.createSubCollectionByUser(this.user, {
            collectionId: this.collection,
            next: {
              documentId: this.data.documentId,
              documentValue: { category: this.category.category, ...value },
            },
          }),
        ]);
        break;

      default:
        const total =
          this.category.data
            .filter((item) => item.documentId !== this.data.documentId)
            .map((item) => Number(item.details.currentBalance))
            .reduce((sum, current) => sum + current, 0) +
          Number(value.currentBalance);
        this.loading = false;
        await Promise.all([
          this._netWorthService.create({
            id: this.user.id,
            document: {
              [this.category.category]: {
                [NETWORTH_VALUE.CURRENT_BALANCE]: total,
              },
            } as INetWorth,
          }),
          this._userService.createSubCollectionByUser(this.user, {
            collectionId: this.collection,
            next: {
              documentId: this.data.documentId,
              documentValue: { category: this.category.category, ...value },
            },
          }),
        ]);
        break;
    }
    throw new SuccessMessage(this.category.category + " saved successfully.");
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
      throw new SuccessMessage("Networth saved successfully.");
    });
  }
}
