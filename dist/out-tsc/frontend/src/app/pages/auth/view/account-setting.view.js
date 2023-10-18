"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let AccountViewComponent = class AccountViewComponent {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.panelOpenState = false;
    }
    async ngOnInit() {
        const i = 1;
        // this.authService.register({1
        //   email: "hunt1.yuyh@gmail.com",
        //   password: "123456",
        //   username: "sdf",
        // });
        // const user = await this.userService.getUserWithEmail(false);
        // console.log(user);
    }
};
AccountViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
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
          <div class="grid-tile-align-up-content">
            <div class="container">
              <div class="row mb-4 justify-content-center">
                <div
                  class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
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
          <div class="grid-tile-align-up-content mt-4">
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
], AccountViewComponent);
exports.AccountViewComponent = AccountViewComponent;
//# sourceMappingURL=account-setting.view.js.map