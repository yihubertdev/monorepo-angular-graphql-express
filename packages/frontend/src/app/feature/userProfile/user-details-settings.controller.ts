import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import {
  HOME_ADDRESS_PROFILE,
  SETTINGS,
  SETTINGS_FORM_CONFIG,
} from "../../core/static/auth.static";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { ITab, ITabPanel, IUser, SETTING_CATEGORY } from "sources-types";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../shared/dialog/add-profile-section.dialog";
import { v4 as uuidv4 } from "uuid";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { homeAdressSchema } from "src/app/core/joiSchema/auth.schema";
import { groupBy } from "../../core/utils/lodash";

export interface IUserTabSettings {
  title: string;
  panel: IUserSettings[];
}

export interface IUserSettings {
  title: string;
  description: string;
  category: string;
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
                  <mat-icon>add</mat-icon>
                </a>
                <user-details-card-component
                  *ngFor="let item of setting.data"
                  [userDetails]="item"
                  [user]="user"
                  [category]="setting.category"
                  [title]="setting.title"
                  [isSettingsPage]="true"></user-details-card-component>
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
  @Input({ required: true }) section!: string;

  public settings!: IUserSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  openDialog(data: any) {
    const dialogRef = this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        documentId: uuidv4(),
        category: data.category,
        title: data.title,
        user: this.user,
        formList: SETTINGS_FORM_CONFIG[data.category].list,
        formSchema: SETTINGS_FORM_CONFIG[data.category].schema,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    const { user, data } = this.route.snapshot.data["settings"];

    this.user = user;
    const groupedData = groupBy(data, "category");
    this.settings = SETTINGS[this.section].map((setting) => {
      const { title, description, category } = setting as ITabPanel;

      switch (category) {
        case SETTING_CATEGORY.ACCOUNT: {
          const userInfo = this.route.parent?.snapshot.data["user"];
          return {
            title: title,
            description: description,
            category: category,
            data: [
              {
                details: userInfo,
                formList: SETTINGS_FORM_CONFIG[category].list,
              },
            ],
          };
        }

        case SETTING_CATEGORY.AUTHENTICATION:
        case SETTING_CATEGORY.CASH_ACCOUNTS_RECEIVABLE: {
          return {
            title: title,
            description: description,
            category: category,
            data: groupedData[category]?.map((form: any) => ({
              details: form,
              documentId: form.documentId,
              formList: SETTINGS_FORM_CONFIG[category].list,
              formSchema: SETTINGS_FORM_CONFIG[category].schema,
            })),
          };
        }
        default: {
          return {
            title: title,
            description: description,
            category: category,
            data: groupedData[category]?.map((form: any) => ({
              details: form,
              documentId: form.documentId,
              formList: SETTINGS_FORM_CONFIG[category].list,
              formSchema: SETTINGS_FORM_CONFIG[category].schema,
            })),
          };
        }
      }
    });
  }
}
