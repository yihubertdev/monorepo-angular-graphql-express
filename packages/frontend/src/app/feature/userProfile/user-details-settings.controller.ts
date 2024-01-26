import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  INetWorth,
  ISettingCategory,
  NETWORTH_VALUE,
  SETTING_COLLECTIONS,
} from "../../core/static/form.static";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import {
  EQUITY_TITLE,
  NET_INCOME_TITLE,
  NetWorthListComponent,
} from "../../shared/components/postCard/net-worth-list.component";
import {
  IUser,
  PartialRecord,
  SETTING_CATEGORY,
  SETTING_COLLECTION,
} from "sources-types";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { groupBy } from "../../core/utils/lodash";
import { v4 as uuidv4 } from "uuid";
import { StateDrawMenu } from "../../core/services/state/";
import { CurrencyPipe } from "@angular/common";
import { MatTableModule } from "@angular/material/table";

export interface IUserSettings extends ISettingCategory {
  data: IUserDetailCard[];
  networth: PartialRecord<Partial<NETWORTH_VALUE>, number> | null;
}

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    UserDetailCardComponent,
    MatExpansionModule,
    CurrencyPipe,
    MatTableModule,
    NetWorthListComponent,
  ],
  selector: "user-details-settings-controller",
  template: `
    <mat-accordion multi>
      @for (category of categories; track $index) {
        <div
          class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
          <mat-expansion-panel
            (opened)="_state.post(false)"
            (closed)="_state.post(true)">
            <mat-expansion-panel-header>
              <mat-panel-title class="show-one-line">
                {{ category.title }}
              </mat-panel-title>
              <mat-panel-description class="show-one-line">
                {{ category.description }}
              </mat-panel-description>
            </mat-expansion-panel-header>
            <ng-template matExpansionPanelContent>
              @switch (category.type) {
                @case ("CURRENT_BALANCE") {
                  <h5>
                    Current Balance:
                    {{ category.networth?.CURRENT_BALANCE ?? 0 | currency }}
                  </h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
                @case ("MARKET_VALUE") {
                  <h5>
                    Market Value:
                    {{ category.networth?.MARKET_VALUE ?? 0 | currency }}
                  </h5>
                  <h5>
                    Equity: {{ category.networth?.EQUITY ?? 0 | currency }}
                  </h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
                @case ("FACE_VALUE") {
                  <h5>
                    Face Value:
                    {{ category.networth?.FACE_VALUE ?? 0 | currency }}
                  </h5>
                  <h5>CSV: {{ category.networth?.CSV ?? 0 | currency }}</h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
              }
              @if (
                category.category !== "PERSONAL_STATEMENT_OF_EQUITY" &&
                category.category !== "PERSONAL_STATEMENT_OF_NET_INCOME"
              ) {
                @for (item of category.data; track $index) {
                  <user-details-card-component
                    [document]="item"
                    [collection]="collection"
                    [user]="user"
                    [category]="category"></user-details-card-component>
                }
              }

              @if (category.category === "PERSONAL_STATEMENT_OF_EQUITY") {
                <net-worth-list-component
                  [dataSource]="EQUITY_DATA"
                  [dataColumn]="EQUILY_COLUMN"></net-worth-list-component>
              }
              @if (category.category === "PERSONAL_STATEMENT_OF_NET_INCOME") {
                <net-worth-list-component
                  [dataSource]="NET_INCOME_DATA"
                  [dataColumn]="NET_INCOME_COLUMN"></net-worth-list-component>
              }

              @if (
                category.type !== "BASIC_INFORMATION" &&
                category.type !== "NETWORTH_LIST"
              ) {
                <a
                  mat-button
                  (click)="addData(category.data)">
                  Add New {{ category.title }}
                  <mat-icon>add</mat-icon>
                </a>
              }
            </ng-template>
          </mat-expansion-panel>
        </div>
      }
    </mat-accordion>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsSettingsController implements OnInit, OnDestroy {
  @Input({ required: true }) collection!: SETTING_COLLECTION;

  public categories!: IUserSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  public networth?: number;

  EQUILY_COLUMN: EQUITY_TITLE[] = Object.values(EQUITY_TITLE);
  EQUITY_DATA: Record<EQUITY_TITLE, string | number>[] = [];

  NET_INCOME_COLUMN: NET_INCOME_TITLE[] = Object.values(NET_INCOME_TITLE);
  NET_INCOME_DATA: Record<NET_INCOME_TITLE, string | number>[] = [];
  constructor(
    private route: ActivatedRoute,
    public _state: StateDrawMenu
  ) {}

  ngOnDestroy(): void {
    this._state.post(true);
  }

  ngOnInit() {
    const { networth, settings } = this.route.snapshot.data;
    const { user, data } = settings;
    this.user = user;
    const cash = networth as INetWorth;
    const groupedData = groupBy(data, "category");
    if (this.collection === SETTING_COLLECTION.PERSONAL_NET_WORTH) {
      this.EQUITY_DATA = [
        {
          ASSETS: "Cash (Sch A)",
          AMOUNT: String(cash.cash_accounts_receivable?.CURRENT_BALANCE ?? 0),
          LIABILITIES: "Overdrafts (Sch J)",
          EXPENSE: String(0),
        },
        {
          ASSETS: "Accounts Receivable (Sch A)",
          AMOUNT: 0,
          LIABILITIES: "Credit Cards (Sch J)",
          EXPENSE: 0,
        },
        {
          ASSETS: "Other Liquid Assets (Sch A)",
          AMOUNT: 0,
          LIABILITIES: "Marketable Securities (Sch B)",
          EXPENSE:
            (cash.markable_securities?.MARKET_VALUE ?? 0) -
            (cash.markable_securities?.EQUITY ?? 0),
        },
        {
          ASSETS: "Marketable Securities (Sch B)",
          AMOUNT: cash.markable_securities?.MARKET_VALUE ?? 0,
          LIABILITIES: "Tax Sheltered Invest (Sch C)",
          EXPENSE:
            (cash.tax_sheltered_investment?.MARKET_VALUE ?? 0) -
            (cash.tax_sheltered_investment?.EQUITY ?? 0),
        },
        {
          ASSETS: "Tax Sheltered Invest (Sch C)",
          AMOUNT: cash.tax_sheltered_investment?.MARKET_VALUE ?? 0,
          LIABILITIES: "Insurance (Sch D)",
          EXPENSE: 0,
        },
        {
          ASSETS: "Insurance CSV (Sch D)",
          AMOUNT: cash.insurance?.CSV ?? 0,
          LIABILITIES: "Home (Sch E)",
          EXPENSE: cash.real_estate?.MARKET_VALUE ?? 0,
        },
        {
          ASSETS: "Home (Sch E)",
          AMOUNT: cash.real_estate?.MARKET_VALUE ?? 0,
          LIABILITIES: "Mortgages (Sch E)",
          EXPENSE: cash.real_estate?.MARKET_VALUE ?? 0,
        },
        {
          ASSETS: "Real Estate (Sch E)",
          AMOUNT: cash.real_estate?.MARKET_VALUE ?? 0,
          LIABILITIES: "Business Interests (Sch F)",
          EXPENSE: cash.business_interest?.CURRENT_BALANCE ?? 0,
        },
        {
          ASSETS: "Business Interests (Sch F)",
          AMOUNT: cash.business_interest?.CURRENT_BALANCE ?? 0,
          LIABILITIES: "Vehicle (Sch G)",
          EXPENSE:
            (cash.vehicles?.MARKET_VALUE ?? 0) - (cash.vehicles?.EQUITY ?? 0),
        },
        {
          ASSETS: "Vehicles (Sch G)",
          AMOUNT: cash.vehicles?.MARKET_VALUE ?? 0,
          LIABILITIES: "Other Loans (Sch I)",
          EXPENSE: 0,
        },
        {
          ASSETS: "Other Assets (Sch H)",
          AMOUNT: 0,
          LIABILITIES: "Other Liabilities (Sch J)",
          EXPENSE: 0,
        },
        {
          ASSETS: "Line Of Credit Limits (Sch J)",
          AMOUNT: 0,
          LIABILITIES: "Total Liabilities",
          EXPENSE: 0,
        },
        {
          ASSETS: "Total Assets",
          AMOUNT: 0,
          LIABILITIES: "Total Equity",
          EXPENSE: 0,
        },
      ];

      this.NET_INCOME_DATA = [
        {
          INCOME: "Salary, Bonus, Commissions",
          AMOUNT: cash.cash_accounts_receivable?.CURRENT_BALANCE ?? 0,
          EXPENSES: "Marketable Securities (Sch B)",
          COST: 0,
        },
        {
          INCOME: "Professional",
          AMOUNT: 0,
          EXPENSES: "Tax Sheltered Invest (Sch C)",
          COST: 0,
        },
        {
          INCOME: "Spouse",
          AMOUNT: 0,
          EXPENSES: "Insurance (Sch D)",
          COST:
            (cash.markable_securities?.MARKET_VALUE ?? 0) -
            (cash.markable_securities?.EQUITY ?? 0),
        },
        {
          INCOME: "Other",
          AMOUNT: cash.markable_securities?.MARKET_VALUE ?? 0,
          EXPENSES: "Home (Sch E)",
          COST:
            (cash.tax_sheltered_investment?.MARKET_VALUE ?? 0) -
            (cash.tax_sheltered_investment?.EQUITY ?? 0),
        },
        {
          INCOME: "Marketable Securities (Sch B)",
          AMOUNT: cash.tax_sheltered_investment?.MARKET_VALUE ?? 0,
          EXPENSES: "Real Estate (Sch E)",
          COST: 0,
        },
        {
          INCOME: "Home (Sch E)",
          AMOUNT: cash.insurance?.CSV ?? 0,
          EXPENSES: "Business Interest (Sch F)",
          COST: cash.real_estate?.MARKET_VALUE ?? 0,
        },
        {
          INCOME: "Real Estate (Sch E)",
          AMOUNT: cash.real_estate?.MARKET_VALUE ?? 0,
          EXPENSES: "Vehicle (Sch G)",
          COST: cash.real_estate?.MARKET_VALUE ?? 0,
        },
        {
          INCOME: "Business Interests (Sch F)",
          AMOUNT: cash.real_estate?.MARKET_VALUE ?? 0,
          EXPENSES: "Other Loans Payments (Sch I)",
          COST: cash.business_interest?.CURRENT_BALANCE ?? 0,
        },
        {
          INCOME: "Dependants",
          AMOUNT: cash.business_interest?.CURRENT_BALANCE ?? 0,
          EXPENSES: "Other (Sch K)",
          COST:
            (cash.vehicles?.MARKET_VALUE ?? 0) - (cash.vehicles?.EQUITY ?? 0),
        },
        {
          INCOME: "Total Income",
          AMOUNT: cash.vehicles?.MARKET_VALUE ?? 0,
          EXPENSES: "Total Expenses",
          COST: 0,
        },
        {
          INCOME: "Total Net Income",
          AMOUNT: 0,
          EXPENSES: "",
          COST: 0,
        },
      ];
    }
    this.categories = SETTING_COLLECTIONS[this.collection].map((collection) => {
      const { category } = collection;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.parent?.snapshot.data["user"];
          return {
            ...collection,
            networth: null,
            data: [
              {
                details: userInfo,
              },
            ],
          };
        }

        case SETTING_CATEGORY.BIOGRAPHY: {
          const userInfo = this.route.parent?.parent?.snapshot.data["user"];
          return {
            ...collection,
            networth: null,
            data: [
              {
                details: {
                  biography: userInfo.description,
                },
                documentId: userInfo.uId,
              },
            ],
          };
        }

        case SETTING_CATEGORY.PERSONAL_STATEMENT_OF_EQUITY: {
          return {
            ...collection,
            networth: cash ? cash[category] : null,
            data: [
              {
                details: {},
                documentId: uuidv4(),
              },
            ],
          };
        }

        case SETTING_CATEGORY.PERSONAL_STATEMENT_OF_EQUITY:
        case SETTING_CATEGORY.PERSONAL_STATEMENT_OF_NET_INCOME: {
          return { ...collection, networth: null, data: [] };
        }

        default: {
          return {
            ...collection,
            networth: cash ? cash[category] : null,
            data: groupedData[category]
              ? groupedData[category].map((form: any) => ({
                  details: form,
                  documentId: form.documentId,
                }))
              : [
                  {
                    details: {},
                    documentId: uuidv4(),
                  },
                ],
          };
        }
      }
    });
  }

  addData(item: any) {
    item.push({
      details: {},
      documentId: uuidv4(),
    });
  }
}
