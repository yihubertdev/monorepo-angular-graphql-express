import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, Params } from "@angular/router";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";

@Component({
  standalone: true,
  imports: [CommonModule, HomePagePostModule, MatTabsModule],
  template: `
    <mat-tab-group>
      <mat-tab label="Posts">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-post-controller
                [isPagination]="true"
                [userId]="userId"></home-page-post-controller>
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Articles">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-article-controller></home-page-article-controller>
            </div>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ["../profile.style.css"],
})
export class UsersView implements OnInit {
  public userId?: string;
  constructor(private _activatedRouter: ActivatedRoute) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe((params: Params) => {
      this.userId = params["id"];
    });
  }
}
