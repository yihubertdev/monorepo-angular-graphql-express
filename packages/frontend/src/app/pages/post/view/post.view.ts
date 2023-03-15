import { Component } from "@angular/core";
import { IPostList } from "src/app/core/models/view.types";
import { postList } from "src/app/core/static/post.static";

@Component({
  selector: "post-view",
  template: `
    <!-- <ng-container>
      <mat-spinner></mat-spinner>
    </ng-container> -->
    <!-- router container 90dvh -->
    <div class="responsive-post-section">
      <mat-grid-list
        [attrGridCols]="{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }"
        rowHeight="10dvh">
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 1
            },
            sm: {
              colspan: 1,
              rowspan: 1
            },
            md: {
              colspan: 0,
              rowspan: 0
            },
            lg: {
              colspan: 0,
              rowspan: 0
            },
            xl: {
              colspan: 0,
              rowspan: 0
            }
          }">
          <post-category-controller></post-category-controller>
        </mat-grid-tile>
        <!-- desktop 90dvh content, mobile 10dvh category and 80dvh content-->
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 8
            },
            sm: {
              colspan: 1,
              rowspan: 8
            },
            md: {
              colspan: 10,
              rowspan: 9
            },
            lg: {
              colspan: 10,
              rowspan: 9
            },
            xl: {
              colspan: 10,
              rowspan: 9
            }
          }">
          <div
            class="container responsive-container-overflow max-width-container container-overflow-vertical">
            <div class="row mb-2">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <carousel-slider-component
                  [images]="images"></carousel-slider-component>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <jobs-horizonal-scroll-controller></jobs-horizonal-scroll-controller>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12">
                <lib-ui></lib-ui>
                <chat-topic-post-controller></chat-topic-post-controller>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <home-page-post-controller></home-page-post-controller>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <home-page-post-controller></home-page-post-controller>
              </div>
            </div>
          </div>
        </mat-grid-tile>

        <add-text-editor-controller></add-text-editor-controller>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ["../post.style.css"],
})
export class PostViewComponent {
  postList: IPostList[];
  images = [
    "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fezgif.com-gif-maker.gif?alt=media&token=8be8bb21-b17b-4f80-a2d5-7de063b733ed",
    "https://material.angular.io/assets/img/examples/shiba2.jpg",
  ];

  constructor() {
    this.postList = postList;
  }
}
