import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { IUser, SETTING_CATEGORY } from "type-sources";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormInputListComponent } from "../formInputList/form-list.component";
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
              documentId: document.documentId,
              category: category.category,
              title: category.title
            })
          ">
          Remove<mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    }

    <mat-card-content>
      <form-list-component
        [list]="category.list"
        [schema]="category.schema"
        buttonName="Save"
        (formValue)="handle($event)"
        [loading]="loading"></form-list-component>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
  @Input({ required: true }) collection!: string;
  @Input({ required: true }) user!: QueryDocumentSnapshot<IUser>;
  @Input({ required: true }) category!: IUserSettings;
  @Input({ required: true }) document!: IUserDetailCard;

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
    if (
      this.category.category === SETTING_CATEGORY.PERSONAL_STATEMENT_OF_EQUITY
    ) {
      this.loading = true;
      return this.category.list.forEach((list) => (list.value = 180000));
    }
    this.category.list.forEach(
      (list) => (list.value = this.document.details[list.key])
    );
  }

  private _calculateMarketValue(marketValue: number): number {
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.marketValue ?? 0))
        .reduce((sum, current) => sum + current, 0) + Number(marketValue ?? 0);

    return total;
  }

  private _calculateFaceValue(faceValue: number): number {
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.faceValue ?? 0))
        .reduce((sum, current) => sum + current, 0) + Number(faceValue ?? 0);

    return total;
  }

  private _calculateCashSurrenderValue(cashSurrenderValue: number): number {
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.cashSurrenderValue ?? 0))
        .reduce((sum, current) => sum + current, 0) +
      Number(cashSurrenderValue ?? 0);

    return total;
  }

  private _calculateMortageBalance(
    mortageBalance: number,
    scndMortageBalance: number
  ): number {
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map(
          (item) =>
            Number(item.details.mortageBalance ?? 0) +
            Number(item.details["2ndMortageBalance"] ?? 0)
        )
        .reduce((sum, current) => sum + current, 0) +
      Number(mortageBalance ?? 0) +
      Number(scndMortageBalance ?? 0);

    return total;
  }

  private _calculateKelleyBlueBookValue(kelleyBlueBookValue: number): number {
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.kelleyBlueBookValue ?? 0))
        .reduce((sum, current) => sum + current, 0) +
      Number(kelleyBlueBookValue ?? 0);

    return total;
  }

  private _calculateCurrentBalance(currentBalance: number): number {
    console.log(this.category.data);
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.currentBalance ?? 0))
        .reduce((sum, current) => sum + current, 0) +
      Number(currentBalance ?? 0);

    return total;
  }

  private _calculateLoanBalance(loanBalance: number): number {
    console.log(this.category.data);
    const total =
      this.category.data
        .filter((item) => item.documentId !== this.document.documentId)
        .map((item) => Number(item.details.loanBalance ?? 0))
        .reduce((sum, current) => sum + current, 0) + Number(loanBalance ?? 0);

    return total;
  }

  handle(value: any, documentId?: string) {
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
      case SETTING_CATEGORY.OTHER_ASSETS:
      case SETTING_CATEGORY.TAX_SHELTERED_INVESTMENT:
      case SETTING_CATEGORY.MARKABLE_SECURITY: {
        const marketValue = this._calculateMarketValue(value.marketValue);

        if (!documentId) {
          this._userService.createSubCollection(this.user.ref, {
            collectionId: this.collection,
            documentValue: {
              category: this.category.category,
              ...value,
            },
          });
        }
        this._netWorthService.create({
          id: this.user.id,
          document: {
            [this.category.category]: {
              [NETWORTH_VALUE.MARKET_VALUE]: marketValue,
              [NETWORTH_VALUE.EQUITY]: marketValue,
            },
          } as INetWorth,
        });
        // Update net worth value after user changed the value
        this.category.networth = {
          [NETWORTH_VALUE.MARKET_VALUE]: marketValue,
          [NETWORTH_VALUE.EQUITY]: marketValue,
        };
        this.loading = false;
        break;
      }

      case SETTING_CATEGORY.INSURANCE: {
        const faceValue = this._calculateFaceValue(value.faceValue);
        const cashSurrenderValue = this._calculateCashSurrenderValue(
          value.cashSurrenderValue
        );

        if (!documentId) {
          this._userService.createSubCollection(this.user.ref, {
            collectionId: this.collection,
            documentValue: {
              category: this.category.category,
              ...value,
            },
          });
        }

        this._netWorthService.create({
          id: this.user.id,
          document: {
            [this.category.category]: {
              [NETWORTH_VALUE.FACE_VALUE]: faceValue,
              [NETWORTH_VALUE.CSV]: cashSurrenderValue,
            },
          } as INetWorth,
        });

        this.category.networth = {
          [NETWORTH_VALUE.FACE_VALUE]: faceValue,
          [NETWORTH_VALUE.CSV]: cashSurrenderValue,
        };
        break;
      }
      case SETTING_CATEGORY.REAL_ESTATE: {
        const totalEstate = this._calculateMarketValue(value.marketValue);

        const totalMortage = this._calculateMortageBalance(
          value.mortageBalance,
          value["2ndMortageBalance"]
        );

        if (!documentId) {
          this._userService.createSubCollection(this.user.ref, {
            collectionId: this.collection,
            documentValue: {
              category: this.category.category,
              ...value,
            },
          });
        }
        this._netWorthService.create({
          id: this.user.id,
          document: {
            [this.category.category]: {
              [NETWORTH_VALUE.MARKET_VALUE]: totalEstate,
              [NETWORTH_VALUE.EQUITY]: totalEstate - totalMortage,
            },
          } as INetWorth,
        });

        this.category.networth = {
          [NETWORTH_VALUE.MARKET_VALUE]: totalEstate,
          [NETWORTH_VALUE.EQUITY]: totalEstate - totalMortage,
        };

        break;
      }
      case SETTING_CATEGORY.VEHICLES: {
        const totalVehicles = this._calculateKelleyBlueBookValue(
          value.kelleyBlueBookValue
        );
        const totalLoan = this._calculateLoanBalance(value.loanBalance);

        if (!documentId) {
          this._userService.createSubCollection(this.user.ref, {
            collectionId: this.collection,
            documentValue: {
              category: this.category.category,
              ...value,
            },
          });
        }
        this._netWorthService.create({
          id: this.user.id,
          document: {
            [this.category.category]: {
              [NETWORTH_VALUE.MARKET_VALUE]: totalVehicles,
              [NETWORTH_VALUE.EQUITY]: totalVehicles - totalLoan,
            },
          } as INetWorth,
        });

        this.category.networth = {
          [NETWORTH_VALUE.MARKET_VALUE]: totalVehicles,
          [NETWORTH_VALUE.EQUITY]: totalVehicles - totalLoan,
        };

        break;
      }
      default: {
        const total = this._calculateCurrentBalance(value.currentBalance);
        this.category.networth = {
          [NETWORTH_VALUE.CURRENT_BALANCE]: total,
        };
        this.loading = false;

        if (!documentId) {
          this._userService.createSubCollection(this.user.ref, {
            collectionId: this.collection,
            documentValue: {
              category: this.category.category,
              ...value,
            },
          });
        }

        this._netWorthService.create({
          id: this.user.id,
          document: {
            [this.category.category]: {
              [NETWORTH_VALUE.CURRENT_BALANCE]: total,
            },
          } as INetWorth,
        });
        break;
      }
    }

    if (documentId) {
      this._userService.deleteSubCollection(this.user.ref, {
        collectionId: this.collection,
        next: {
          documentId,
        },
      });

      // delete the category data for the specific document
      this.category.data = this.category.data.filter(
        (item) => item.documentId !== documentId
      );
      throw new SuccessMessage(
        this.category.category + " deleted successfully."
      );
    }

    // add the category new data detail for the specific document
    this.category.data = this.category.data.map((item) =>
      item.documentId === this.document.documentId
        ? { ...item, details: value }
        : item
    );
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

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      this.handle({}, result.documentId);
      // each category have a data array which contains multiple document
      // this.groupedSettings[category][0].data = this.groupedSettings[
      //   category
      // ][0].data.filter((item) => item.documentId != documentId);
    });
  }
}
