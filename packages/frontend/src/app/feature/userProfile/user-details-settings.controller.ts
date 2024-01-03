import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  INetWorth,
  ISettingCategory,
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

export interface IUserSettings extends ISettingCategory {
  data: IUserDetailCard[];
  networth: INetWorth;
}

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    UserDetailCardComponent,
    MatExpansionModule,
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
                  <h3>
                    Current Balance:
                    {{ category.networth }}
                  </h3>
                  <p>
                    List all of your Cash Assets, to add a new Cash Asset click
                    the "Add New Cash Asset" button.
                  </p>
                }
                @case ("MARKET_VALUE") {
                  <div>Blue</div>
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
    const groupedData = groupBy(data, "category");

    this.categories = SETTING_COLLECTIONS[this.collection].map((collection) => {
      const { category } = collection;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.parent?.snapshot.data["user"];
          return {
            ...collection,
            networth: networth ? networth[category] : 0,
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
            networth: networth ? networth[category] : 0,
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
            networth: networth ? networth[category] : 0,
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
