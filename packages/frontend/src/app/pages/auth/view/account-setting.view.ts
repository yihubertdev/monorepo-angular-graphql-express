import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { UserService } from "src/app/core/services/fireStore/users.firestore";

@Component({
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="responsive-post-section">
      <mat-grid-list
        [attrGridCols]="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }"
        rowHeight="10dvh">
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 3
            },
            sm: {
              colspan: 1,
              rowspan: 3
            },
            md: {
              colspan: 1,
              rowspan: 3
            },
            lg: {
              colspan: 1,
              rowspan: 3
            },
            xl: {
              colspan: 1,
              rowspan: 3
            }
          }">
          <div
            class="grid-content-up-center m-0 p-0"
            style="height: 100%;">
            <div
              class="container max-width-container container-overflow-vertical"
              style="height: 100%;">
              <div
                class="row justify-content-center m-0 p-0"
                style="height: 100%;">
                <div
                  class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 m-0 p-0">
                  <user-profile-controller></user-profile-controller>
                </div>
              </div>
            </div>
          </div>
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
              colspan: 1,
              rowspan: 5
            },
            lg: {
              colspan: 1,
              rowspan: 5
            },
            xl: {
              colspan: 1,
              rowspan: 5
            }
          }">
          <div class="grid-content-up-center mt-4">
            <div
              class="container max-width-container container-overflow-vertical">
              <div class="row mb-4 justify-content-center">
                <div
                  class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <account-setting-controller></account-setting-controller>
                </div>
              </div>
            </div>
          </div>
        </mat-grid-tile>
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
              colspan: 1,
              rowspan: 1
            },
            lg: {
              colspan: 1,
              rowspan: 1
            },
            xl: {
              colspan: 1,
              rowspan: 1
            }
          }">
          <div class="container">
            <div class="row mb-4 justify-content-center">
              <div
                class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <sign-out-controller></sign-out-controller>
              </div>
            </div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ["../auth.style.css"],
})
export class AccountViewComponent {
  panelOpenState = false;
}
