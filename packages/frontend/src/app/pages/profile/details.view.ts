import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { UserDetailsController } from "../../feature/userProfile/user-details.controller";
import { SessionStorageService } from "../../core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";

@Component({
  standalone: true,
  imports: [CommonModule, UserDetailsController],
  template: `
    <div class="row justify-content-center m-0 p-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
        <user-details-controller [userId]="userId"></user-details-controller>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class DetailsView implements OnInit {
  @Input() id?: string; // after angular 16, user can get route param by input on the route connect component
  public userId!: string;

  constructor(private _sessionStorage: SessionStorageService) {}

  ngOnInit() {
    if (!this.id) return;

    this.userId =
      this.id === "me"
        ? this._sessionStorage.getSessionStorage<IUser>("user")!.userId
        : this.id;
  }
}
