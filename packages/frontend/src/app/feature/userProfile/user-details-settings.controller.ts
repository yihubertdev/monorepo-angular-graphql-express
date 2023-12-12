import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
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

export interface IUserSettings extends ISettingCategory {
  data: IUserDetailCard[];
}

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    UserDetailCardComponent,
    MatExpansionModule,
  ],
  selector: "user-details-settings-controller",
  template: `
    <div class="container mt-3">
      <div class="row">
        <mat-accordion>
          <div
            *ngFor="let category of categories"
            class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title class="show-one-line">
                  {{ category.title }}
                </mat-panel-title>
                <mat-panel-description class="show-one-line">
                  {{ category.description }}
                </mat-panel-description>
              </mat-expansion-panel-header>
              <ng-template matExpansionPanelContent>
                <user-details-card-component
                  *ngFor="let item of category.data"
                  [settingDetail]="item"
                  [collection]="collection"
                  [user]="user"
                  [category]="category.category"
                  [title]="category.title"
                  [formList]="category.list"
                  [schema]="category.schema"
                  [noEdit]="category.noEdit"></user-details-card-component>
                <a
                  mat-button
                  *ngIf="!category.noEdit">
                  Add New {{ category.title }}
                  <mat-icon>add</mat-icon>
                </a>
              </ng-template>
            </mat-expansion-panel>
          </div>
        </mat-accordion>
      </div>
    </div>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsSettingsController implements OnInit {
  @Input({ required: true }) collection!: SETTING_COLLECTION;

  public categories!: IUserSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  protected groupedSettings!: Record<string, Omit<IUserSettings, "category">[]>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const { user, data } = this.route.snapshot.data["settings"];

    this.user = user;
    const groupedData = groupBy(data, "category");

    this.categories = SETTING_COLLECTIONS[this.collection].map((collection) => {
      const { category } = collection;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.snapshot.data["user"];
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
          const userInfo = this.route.parent?.snapshot.data["user"];
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
    // each category only have one object, each object have multiple data
    this.groupedSettings = groupBy(this.categories, "category");
  }
}
