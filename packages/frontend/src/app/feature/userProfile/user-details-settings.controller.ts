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
import { AddProfileSectionDialog } from "../../shared/dialog/add-profile-section.dialog";
import { v4 as uuidv4 } from "uuid";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { groupBy } from "../../core/utils/lodash";

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
            *ngFor="let setting of settings"
            class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title> {{ setting.title }} </mat-panel-title>
                <mat-panel-description>
                  {{ setting.description }}
                </mat-panel-description>
              </mat-expansion-panel-header>
              <ng-template matExpansionPanelContent>
                <a
                  mat-button
                  (click)="openDialog(setting)"
                  *ngIf="setting.category !== 'account'">
                  Add New {{ setting.title }}
                  <mat-icon>add</mat-icon>
                </a>
                <user-details-card-component
                  *ngFor="let item of setting.data"
                  [userDetails]="item"
                  [user]="user"
                  [category]="setting.category"
                  [title]="setting.title"
                  [formList]="setting.list"
                  [formSchema]="setting.schema"
                  [isSettingsPage]="true"
                  (removeChange)="remove($event)"></user-details-card-component>
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

  public settings!: IUserSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  protected groupedSettings!: Record<string, Omit<IUserSettings, "category">[]>;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

  openDialog(data: IUserSettings) {
    data.list.forEach((list) => (list.value = ""));
    const dialogRef = this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        documentId: uuidv4(),
        collection: this.collection,
        category: data.category,
        title: data.title,
        user: this.user,
        formList: data.list,
        formSchema: data.schema,
      },
    });
  }

  remove(value: { documentId: string; category: string }) {
    const { documentId, category } = value;
    // each category only have one object, each object have multiple data
    this.groupedSettings[category][0].data = this.groupedSettings[
      category
    ][0].data.filter((item) => item.documentId != documentId);

    this._userService.deleteSubCollectionDocumentByUserId(this.user, {
      collectionId: this.collection,
      next: {
        documentId,
      },
    });
  }

  ngOnInit() {
    const { user, data } = this.route.snapshot.data["settings"];

    this.user = user;
    const groupedData = groupBy(data, "category");

    this.settings = SETTING_COLLECTIONS[this.collection].map((collection) => {
      const { title, description, category, list, schema } = collection;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.snapshot.data["user"];
          return {
            title: title,
            description: description,
            category: category,
            list: list,
            data: [
              {
                details: userInfo,
              },
            ],
          };
        }

        default: {
          return {
            title: title,
            description: description,
            category: category,
            list: list,
            schema: schema,
            data: groupedData[category]?.map((form: any) => ({
              details: form,
              documentId: form.documentId,
            })),
          };
        }
      }
    });
    // each category only have one object, each object have multiple data
    this.groupedSettings = groupBy(this.settings, "category");
  }
}
