import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/fireAuth/auth";
import { CommonModule } from "@angular/common";
import { AddTextEditorModule } from "src/app/feature/addTextEditor/add-text-editor.module";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  standalone: true,
  selector: "post-view",
  imports: [
    CommonModule,
    AddTextEditorModule,
    HomePagePostModule,
    MatTabsModule,
  ],
  template: `
    <!-- container responsive-height-container -->
    <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
    <mat-tab-group>
      <mat-tab label="Posts">
        <div class="container">
          <!--justify-content-center center the inner col-->
          <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12">
              <home-page-post-controller
                [isPagination]="true"
                [isUserProfile]="false"
                [isMe]="false"></home-page-post-controller>
            </div>
          </div>

          <div
            class="fab-button icon-display"
            *ngIf="hasUser">
            <add-text-editor-controller></add-text-editor-controller>
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

          <div
            class="fab-button icon-display"
            *ngIf="hasUser">
            <add-text-editor-controller></add-text-editor-controller>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ["../home.style.css"],
})
export class PostView {
  public hasUser?: boolean;
  constructor(private _authService: AuthService) {
    this._authService.userAuthObserver$.subscribe((user) => {
      this.hasUser = Boolean(user);
    });
  }
}
