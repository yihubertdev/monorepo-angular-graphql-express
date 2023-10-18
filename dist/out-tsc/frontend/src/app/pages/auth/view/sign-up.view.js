"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpView = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let SignUpView = class SignUpView {
    constructor() { }
};
SignUpView = tslib_1.__decorate([
    (0, core_1.Component)({
        template: ` <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="responsive-post-section">
      <mat-grid-list
        [attrGridCols]="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }"
        rowHeight="10dvh">
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
              colspan: 1,
              rowspan: 9
            },
            lg: {
              colspan: 1,
              rowspan: 9
            },
            xl: {
              colspan: 1,
              rowspan: 9
            }
          }">
          <div class="grid-tile-align-up-content">
            <div class="container">
              <div class="row mb-4 justify-content-center">
                <div
                  class="text-center col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <email-signup-controller></email-signup-controller>
                </div>
              </div>
              <div class="row mb-4 justify-content-center">
                <div
                  class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <oauth-login-controller></oauth-login-controller>
                </div>
              </div>
              <div class="row mb-4 justify-content-center">
                <div
                  class=" text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3>
                    No account?
                    <a
                      mat-tab-link
                      routerLink="../signup">
                      Register</a
                    >
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>`,
        styleUrls: ["../auth.style.css"],
    })
], SignUpView);
exports.SignUpView = SignUpView;
//# sourceMappingURL=sign-up.view.js.map