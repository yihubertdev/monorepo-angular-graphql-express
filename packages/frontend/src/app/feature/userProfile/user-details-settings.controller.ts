import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import {
  ISettingCategory,
  SETTING_COLLECTIONS,
} from "../../core/static/auth.static";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { IUser, SETTING_CATEGORY, SETTING_COLLECTION } from "sources-types";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { groupBy } from "../../core/utils/lodash";
import { RemoveSettingCategoryDialog } from "src/app/shared/dialog/remove-setting-category.dialog";
import { v4 as uuidv4 } from "uuid";
import { Success } from "src/app/core/utils/error";

export interface IUserSettings extends ISettingCategory {
  data: IUserDetailCard[];
}

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    UserDetailCardComponent,
    MatMenuModule,
    MatDialogModule,
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
                  [formSchema]="category.schema"
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
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

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
