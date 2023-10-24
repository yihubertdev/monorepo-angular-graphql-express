import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { HOME_ADDRESS_PROFILE } from "../../core/static/auth.static";
import { homeAdressSchema } from "../../core/joiSchema/auth.schema";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { IProfileHomeAddress, IUser } from "sources-types";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../shared/dialog/add-profile-section.dialog";
import { v4 as uuidv4 } from "uuid";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatExpansionModule } from "@angular/material/expansion";

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
  template: `<mat-tab-group>
    <mat-tab
      label="{{ profile.title }}"
      *ngFor="let profile of userDetails">
      <div class="container">
        <div class="row">
          <div
            class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12">
            <button
              mat-raised-button
              [matMenuTriggerFor]="menu"
              class="m-2">
              Add Profile Section
            </button>
            <mat-menu #menu="matMenu">
              <button
                *ngFor="let section of addProfileSection"
                mat-menu-item
                (click)="openDialog(section)">
                {{ section.title }}
              </button>
            </mat-menu>
            <a
              mat-raised-button
              color="primary"
              [routerLink]="['/users', 'profile-signup', userId]"
              class="m-2">
              Build Your Profile
              <mat-icon>account_box</mat-icon>
            </a>
          </div>
          <div
            *ngFor="let userDetail of profile.details"
            class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
            <mat-accordion>
              <mat-expansion-panel (closed)="(false)">
                <mat-expansion-panel-header>
                  <mat-panel-title> You Account 1 </mat-panel-title>
                </mat-expansion-panel-header>
                <user-details-card-component
                  [userDetails]="userDetail"></user-details-card-component>
              </mat-expansion-panel>
            </mat-accordion>
          </div>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsSettingsController implements OnInit {
  @Input({ required: true }) userId!: string;
  public isDisplay: boolean = true;
  public userDetails!: {
    title: string;
    details: IUserDetailCard<IUser, IProfileHomeAddress>[];
  }[];
  public addProfileSection = [
    {
      title: "Home Address",
      formInputList: HOME_ADDRESS_PROFILE,
      formInputSchema: homeAdressSchema,
    },
  ];
  public info!: {
    profile: IProfileHomeAddress[];
    user: QueryDocumentSnapshot<IUser>;
  };

  constructor(private _userService: UserService, public dialog: MatDialog) {}

  openDialog(sectionInfo: any) {
    const dialogRef = this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        ...sectionInfo,
        documentId: uuidv4(),
        user: this.info.user,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  async ngOnInit() {
    if (this.userId) {
      this.info = await this._userService.retrieveSubCollectionProfile({
        userId: this.userId,
      });

      if (this.info.user) {
        this.userDetails = [
          {
            title: "Personal Profile",
            details: this.info.profile.map((item) => ({
              userSnapshot: this.info.user,
              details: item,
              title: item.title,
              documentId: item.documentId,
              formInputList: HOME_ADDRESS_PROFILE,
              formInputSchema: homeAdressSchema,
            })),
          },
          {
            title: "Business Profile",
            details: this.info.profile.map((item) => ({
              userSnapshot: this.info.user,
              details: item,
              title: item.title,
              documentId: item.documentId,
              formInputList: HOME_ADDRESS_PROFILE,
              formInputSchema: homeAdressSchema,
            })),
          },
          {
            title: "Professional Profile",
            details: this.info.profile.map((item) => ({
              userSnapshot: this.info.user,
              details: item,
              title: item.title,
              documentId: item.documentId,
              formInputList: HOME_ADDRESS_PROFILE,
              formInputSchema: homeAdressSchema,
            })),
          },
        ];
      }
    }
  }
}
