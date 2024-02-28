import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import {
  IUserDetailCard,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { IProfileHomeAddress, IUser } from "type-sources";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";

@Component({
  standalone: true,
  imports: [NgIf, NgFor, MatTabsModule, UserDetailCardComponent],
  selector: "user-details-controller",
  template: `<mat-tab-group>
    <mat-tab
      label="{{ profile.title }}"
      *ngFor="let profile of userDetails">
      <div class="container">
        <div class="row">
          <div
            *ngFor="let userDetail of profile.details"
            class="col-xl-6 col-lg-6
              col-md-6 col-sm-12 col-xs-12 mb-4">
            <!-- <user-details-card-component
              [userDetails]="userDetail"
              [user]="info.user"></user-details-card-component> -->
          </div>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsController implements OnInit {
  @Input({ required: true }) userId!: string;
  public isDisplay: boolean = true;
  public userDetails!: {
    title: string;
    details: IUserDetailCard[];
  }[];
  public info!: {
    data: IProfileHomeAddress[];
    user: QueryDocumentSnapshot<IUser>;
  };

  constructor(private _userService: UserService) {}

  async ngOnInit() {
    // if (this.userId) {
    //   this.info = await this._userService.retrieveSubCollection({
    //     userId: this.userId,
    //   });
    //   if (this.info.user) {
    //     this.userDetails = [
    //       {
    //         title: "Personal Profile",
    //         details: this.info.data.map((item) => ({
    //           userSnapshot: this.info.user,
    //           details: item,
    //           title: item.title,
    //           documentId: item.documentId,
    //           formList: HOME_ADDRESS_PROFILE,
    //           formSchema: homeAdressSchema,
    //         })),
    //       },
    //       {
    //         title: "Business Profile",
    //         details: this.info.data.map((item) => ({
    //           userSnapshot: this.info.user,
    //           details: item,
    //           title: item.title,
    //           documentId: item.documentId,
    //           formList: HOME_ADDRESS_PROFILE,
    //           formSchema: homeAdressSchema,
    //         })),
    //       },
    //       {
    //         title: "Professional Profile",
    //         details: this.info.data.map((item) => ({
    //           userSnapshot: this.info.user,
    //           details: item,
    //           title: item.title,
    //           documentId: item.documentId,
    //           formList: HOME_ADDRESS_PROFILE,
    //           formSchema: homeAdressSchema,
    //         })),
    //       },
    //     ];
    //   }
    // }
  }
}
