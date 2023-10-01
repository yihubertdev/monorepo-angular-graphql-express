import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserDetailsController } from "../../feature/userProfile/user-details.controller";

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
export class DetailsView implements OnInit {
  public userId?: string;
  constructor(private _activatedRouter: ActivatedRoute) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe(
      (params: Params) => (this.userId = params["id"])
    );
  }
}
