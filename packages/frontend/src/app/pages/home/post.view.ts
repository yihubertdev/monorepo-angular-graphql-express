import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddTextEditorModule } from "../../feature/addTextEditor/add-text-editor.module";
import { HomePagePostModule } from "../../feature/homePagePost/home-page-post.module";
import { MatTabsModule } from "@angular/material/tabs";
import { PostCategoryModule } from "../../feature/postCategory/post-category.module";
import { HomePagePostController } from "../../feature/homePagePost/controller/home-page-post.controller";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AddTextEditorModule,
    HomePagePostModule,
    MatTabsModule,
    PostCategoryModule,
    HomePagePostController,
  ],
  template: `
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <mat-tab-group>
      <mat-tab label="Posts">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-post-controller
                [isPagination]="true"></home-page-post-controller>
            </div>
          </div>

          <div class="fab-button icon-display">
            <add-text-editor-controller></add-text-editor-controller>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Articles">
        <div class="container">
          <div class="row mb-3 mx-2">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <post-category-controller></post-category-controller>
            </div>
          </div>
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-article-controller
                [isPagination]="true"></home-page-article-controller>
            </div>
          </div>

          <div class="fab-button icon-display">
            <add-text-editor-controller></add-text-editor-controller>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ["./home.style.css"],
})
export default class PostView {}
