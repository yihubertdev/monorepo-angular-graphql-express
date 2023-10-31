import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { HOME_ADDRESS_PROFILE, SETTINGS } from "../../core/static/auth.static";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { ITabPanel, IUser } from "sources-types";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../shared/dialog/add-profile-section.dialog";
import { v4 as uuidv4 } from "uuid";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { homeAdressSchema } from "src/app/core/joiSchema/auth.schema";

export interface IUserTabSettings {
  title: string;
  panel: IUserSettings[];
}

export interface IUserSettings {
  title: string;
  description: string;
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
  template: `<mat-tab-group *ngIf="withTab">
      <mat-tab
        label="{{ profile.title }}"
        *ngFor="let profile of settings">
        <div class="container">
          <div class="row">
            <mat-accordion>
              <div
                *ngFor="let userDetail of settings"
                class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title> You Account 1 </mat-panel-title>
                    <mat-panel-description>
                      Inform the date you wish to travel
                    </mat-panel-description>
                  </mat-expansion-panel-header>
                  <ng-template matExpansionPanelContent>
                    <user-details-card-component
                      [userDetails]="userDetail"
                      [user]="user"
                      [isSettingsPage]="true"></user-details-card-component>
                  </ng-template>
                </mat-expansion-panel>
              </div>
            </mat-accordion>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>

    <div
      class="container mt-3"
      *ngIf="!withTab">
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
                <user-details-card-component
                  [userDetails]="setting.data"
                  [user]="user"
                  [category]="setting.category"
                  [title]="setting.title"
                  [isSettingsPage]="true"></user-details-card-component>
              </ng-template>
            </mat-expansion-panel>
          </div>
        </mat-accordion>
      </div>
    </div> `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsSettingsController implements OnInit {
  @Input({ required: true }) category!: string;
  @Input({ required: true }) withTab!: boolean;

  public settings!: IUserSettings[] | IUserTabSettings[];
  public user!: QueryDocumentSnapshot<IUser>;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  openDialog(sectionInfo: any) {
    const dialogRef = this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        ...sectionInfo,
        documentId: uuidv4(),
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    const { user, data } = this.route.snapshot.data["settings"];
    this.user = user;
    console.log(data);

    if (!this.withTab) {
      this.settings = (
        SETTINGS[this.category as keyof typeof SETTINGS] as ITabPanel[]
      ).map((setting) => ({
        title: setting.title,
        description: setting.description,
        data: data
          .filter((item: any) => item.category === setting.category)
          .map((form: any) => ({
            details: form,
            documentId: form.documentId,
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          })),
      }));
    } else {
      this.settings = (
        SETTINGS[this.category as keyof typeof SETTINGS] as {
          title: string;
          panel: ITabPanel[];
        }[]
      ).map((setting) => ({
        title: setting.title,
        panel: setting.panel.map(
          (item) =>
            ({
              title: item.title,
              description: item.description,
              data: data
                .filter((i: any) => i.category === item.category)
                .map((form: any) => ({
                  details: form,
                  documentId: form.documentId,
                  formInputList: HOME_ADDRESS_PROFILE,
                  formInputSchema: homeAdressSchema,
                })),
            } as IUserSettings)
        ),
      }));
    }
  }
}
