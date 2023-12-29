import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
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
              @for (item of category.data; track $index) {
                <user-details-card-component
                  [settingDetail]="item"
                  [collection]="collection"
                  [user]="user"
                  [category]="category.category"
                  [title]="category.title"
                  [formList]="category.list"
                  [schema]="category.schema"
                  [noEdit]="category.noEdit"></user-details-card-component>
              }

              @if (!category.noEdit) {
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
export class UserDetailsSettingsController implements OnInit {
  @Input({ required: true }) collection!: SETTING_COLLECTION;

  public categories!: IUserSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  constructor(
    private route: ActivatedRoute,
    public _state: StateDrawMenu
  ) {}

  ngOnInit() {
    const { user, data } = this.route.snapshot.data["settings"];

    this.user = user;
    const groupedData = groupBy(data, "category");

    this.categories = SETTING_COLLECTIONS[this.collection].map((collection) => {
      const { category } = collection;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.parent?.snapshot.data["user"];
          return {
            ...collection,
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
