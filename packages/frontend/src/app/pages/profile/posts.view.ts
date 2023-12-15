import { Component, Input, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/home-page-post.controller";
import { HomePageArticleController } from "../../feature/homePagePost/home-page-article.controller";
import { NgTemplateOutlet } from "@angular/common";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  standalone: true,
  imports: [HomePagePostController, MatTabsModule, NgTemplateOutlet],
  template: `
    <ng-template #matTabContent>
      <div class="container">
        <!--justify-content-center center the inner col-->
        <div class="row justify-content-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
            <home-page-post-controller
              [userId]="id"></home-page-post-controller>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-container *ngTemplateOutlet="matTabContent"></ng-container>
  `,
  styleUrls: [],
})
export default class UsersView {
  public id!: string;
  constructor(private route: ActivatedRoute) {
    this.route.parent?.params.subscribe((param) => {
      this.id = param["id"];
    });
  }
}
