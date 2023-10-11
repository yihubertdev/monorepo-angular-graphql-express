import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { HOME_ADDRESS_PROFILE } from "../../core/static/auth.static";
import { homeAdressSchema } from "../../core/joiSchema/auth.schema";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import {
  ICollectionQueryBuilder,
  IProfile,
  IProfileHomeAddress,
  IUser,
} from "sources-types";
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
    MatExpansionModule,
  ],
  selector: "user-details-controller",
  template: `<mat-tab-group>
    <mat-tab label="Personal Profile">
      <mat-accordion>
        <div class="container">
          <div class="row">
            <div
              *ngFor="let userDetail of userDetails"
              class="col-xl-6 col-lg-6
              col-md-6 col-sm-12 col-xs-12 mb-4">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title> Home Address </mat-panel-title>
                </mat-expansion-panel-header>
                <user-details-card
                  [userDetails]="userDetail"
                  (formValue)="save($event)"></user-details-card>
              </mat-expansion-panel>
            </div>
          </div>
        </div>
      </mat-accordion>
    </mat-tab>
    <mat-tab label="Business Profile">
      <div class="container">
        <div class="row">
          <div
            *ngFor="let userDetail of userDetails"
            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
            <user-details-card
              [userDetails]="userDetail"
              (formValue)="save($event)"></user-details-card>
          </div>
        </div>
      </div>
    </mat-tab>
    <mat-tab label="Professional Profile">
      <div class="container">
        <div class="row">
          <div
            *ngFor="let userDetail of userDetails"
            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
            <user-details-card
              [userDetails]="userDetail"
              (formValue)="save($event)"></user-details-card>
          </div>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsController implements OnInit {
  @Input({ required: true }) userId?: string;
  public isDisplay: boolean = true;
  public userDetails!: IUserDetailCard<IUser, IProfileHomeAddress>[];

  constructor(private _userService: UserService, private _router: Router) {}

  async ngOnInit() {
    if (this.userId) {
      const info = await this._userService.retrieveSubCollectionProfile({
        userId: this.userId,
      });

      if (info.user) {
        this.userDetails = [
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
          {
            userSnapshot: info.user,
            details: info.profile,
            title: "Home Address",
            documentId: "homeAddress",
            formInputList: HOME_ADDRESS_PROFILE,
            formInputSchema: homeAdressSchema,
          },
        ];
        return;
      }

      this._router.navigate(["me", "posts"]);
    }
  }

  async save(formValue: ICollectionQueryBuilder<IProfile>) {
    if (!this.userDetails[0].userSnapshot) return;
    this._userService.addSubCollectionByUserId(
      this.userDetails[0].userSnapshot,
      formValue
    );
  }
}
