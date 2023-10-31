import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";
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
          <mat-accordion>
            <div
              *ngFor="let userDetail of profile.details"
              class="col-xl-12 col-lg-12
              col-md-12 col-sm-12 col-xs-12 mb-4">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title> You Account 1 </mat-panel-title>
                  <mat-panel-description>
                    <mat-icon>date_range</mat-icon>
                    Inform the date you wish to travel
                  </mat-panel-description>
                </mat-expansion-panel-header>
                <ng-template matExpansionPanelContent>
                  <user-details-card-component
                    [userDetails]="userDetail"
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
export class UserDetailsSettingsController implements OnInit {
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
  public userId!: string;

  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

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

  ngOnInit() {
    this.info = this.route.snapshot.data["settings"];
    this.userId = this.route.parent!.snapshot.data["userId"];
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
