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
import { IUser, SETTING_CATEGORY, SETTING_COLLECTION } from "sources-types";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { groupBy } from "../../core/utils/lodash";
import { v4 as uuidv4 } from "uuid";
import { StateDrawMenu } from "../../core/services/state/";
import { CurrencyPipe } from "@angular/common";

export interface IUserSettings extends ISettingCategory {
  data: IUserDetailCard[];
  networth: Record<NETWORTH_VALUE, number> | null;
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
                    {{ category.networth?.CURRENT_BALANCE | currency }}
                  </h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
                @case ("MARKET_VALUE") {
                  <h5>
                    Market Value:
                    {{ category.networth?.MARKET_VALUE | currency }}
                  </h5>
                  <h5>Equity: {{ category.networth?.EQUITY | currency }}</h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
                @case ("FACE_VALUE") {
                  <h5>
                    Face Value:
                    {{ category.networth?.FACE_VALUE | currency }}
                  </h5>
                  <h5>CSV: {{ category.networth?.CSV | currency }}</h5>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
              }

              @for (item of category.data; track $index) {
                <user-details-card-component
                  [data]="item"
                  [collection]="collection"
                  [user]="user"
                  [category]="category"></user-details-card-component>
              }

              @if (category.type !== "BASIC_INFORMATION") {
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
    console.log(item);
  }
}
