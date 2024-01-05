import { Component, Input, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePagePostController } from "../../feature/homePagePost/home-page-post.controller";
import { NgTemplateOutlet } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [HomePagePostController, MatTabsModule, NgTemplateOutlet],
  template: `
    <div class="container">
      <!--justify-content-center center the inner col-->
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-sm-12">
          <home-page-post-controller [userId]="id"></home-page-post-controller>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export default class UsersView {
  public id!: string;
  constructor(private route: ActivatedRoute) {
    this.route.parent?.parent?.params.subscribe((param) => {
      this.id = param["id"];
    });
  }
}
