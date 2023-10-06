import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/controller/home-page-post.controller";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HomePagePostModule,
    MatTabsModule,
    HomePagePostController,
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Posts">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-post-controller
                [isPagination]="true"
                [userId]="id"></home-page-post-controller>
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Articles">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-article-controller
                [isPagination]="true"
                [userId]="id"></home-page-article-controller>
            </div>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: [],
})
export default class UsersView {
  @Input() id?: string;
}
