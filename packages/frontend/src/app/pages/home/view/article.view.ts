import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isNil } from "lodash";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "article-view",
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div
      class="responsive-post-section"
      style="overflow: auto; height: 90dvh;">
      <mat-grid-list
        [attrGridCols]="{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }"
        rowHeight="10dvh">
        <!-- article section 70% width -->
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 9
            },
            sm: {
              colspan: 1,
              rowspan: 9
            },
            md: {
              colspan: 7,
              rowspan: 9
            },
            lg: {
              colspan: 7,
              rowspan: 9
            },
            xl: {
              colspan: 7,
              rowspan: 9
            }
          }">
          <div
            class="container article-container-height-responsive max-width-container container-overflow-vertical">
            <div class="row">
              <div class="article-container-center">
                <article-post-controller
                  [articleContent]="articleContent"
                  [articleTitle]="articleTitle"></article-post-controller>
              </div>
            </div>
          </div>
        </mat-grid-tile>
        <!-- desktop 90dvh content, mobile 10dvh category and 80dvh content-->
        <!-- width 30% -->
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 4
            },
            sm: {
              colspan: 1,
              rowspan: 4
            },
            md: {
              colspan: 3,
              rowspan: 4
            },
            lg: {
              colspan: 3,
              rowspan: 4
            },
            xl: {
              colspan: 3,
              rowspan: 4
            }
          }">
          <user-profile-controller
            [userId]="articleUserId"
            style="width: 100%; height: 100%; margin-bottom: 5%;"></user-profile-controller>
        </mat-grid-tile>

        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 5
            },
            sm: {
              colspan: 1,
              rowspan: 5
            },
            md: {
              colspan: 3,
              rowspan: 5
            },
            lg: {
              colspan: 3,
              rowspan: 5
            },
            xl: {
              colspan: 3,
              rowspan: 5
            }
          }">
          <chat-topic-post-controller
            style="width: 100%; height: 100%; margin-bottom: 5%;"></chat-topic-post-controller>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class ArticleViewComponent implements OnInit {
  public articleId: string = "";
  public articleContent: string = "";
  public articleTitle: string = "";
  public articleUserId: string = "";
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _articleFireStore: ArticleFireStore
  ) {}

  async ngOnInit() {
    this._activatedRouter.params.subscribe(
      (params: Params) => (this.articleId = params["id"])
    );
    const article = await this._articleFireStore.retrieveById(this.articleId);

    if (isNil(article)) {
      this._router.navigateByUrl("posts");
    }

    const { content, title, userId } = article;

    this.articleContent = content;
    this.articleTitle = title;
    this.articleUserId = userId;
  }
}
