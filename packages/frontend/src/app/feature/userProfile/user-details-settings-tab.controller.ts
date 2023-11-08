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
  SETTING_COLLECTION_TAB,
} from "../../core/static/auth.static";
import { UserDetailCardComponent } from "../../shared/components/postCard/user-details-card.component";
import { IUser, SETTING_COLLECTIONTAB } from "sources-types";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../shared/dialog/add-profile-section.dialog";
import { v4 as uuidv4 } from "uuid";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";
import { IUserSettings } from "./user-details-settings.controller";

export interface IUserTabSettings {
  title: string;
  categories: IUserSettings[];
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
  selector: "user-details-settings-tab-controller",
  template: `<mat-tab-group>
    <mat-tab
      label="{{ panel.title }}"
      *ngFor="let panel of tabCategories">
      <div class="container">
        <div class="row">
          <mat-accordion>
            <div
              *ngFor="let setting of panel.categories"
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
                    [userDetails]="setting.data[0]"
                    [user]="user"
                    [category]="setting.category"
                    [title]="setting.title"
                    [formList]="setting.list"
                    [formSchema]="setting.schema"
                    [isSettingsPage]="true"></user-details-card-component>
                </ng-template>
              </mat-expansion-panel>
            </div>
          </mat-accordion>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsSettingsTabController implements OnInit {
  @Input({ required: true }) collection!: SETTING_COLLECTIONTAB;

  public tabCategories!: IUserTabSettings[];
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
    this.tabCategories = SETTING_COLLECTION_TAB[this.collection].map((tab) => ({
      title: tab.title,
      categories: tab.categories.map((setting) => ({
        title: setting.title,
        description: setting.description,
        category: setting.category,
        list: setting.list,
        schema: setting.schema,
        data: data
          .filter((i: any) => i.category === setting.category)
          .map((form: any) => ({
            details: form,
            documentId: form.documentId,
          })),
      })),
    }));
  }
}
