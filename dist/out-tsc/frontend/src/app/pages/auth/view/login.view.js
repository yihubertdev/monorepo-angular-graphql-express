"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginView = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoginView = class LoginView {
    constructor(authService, _router, zone) {
        this.authService = authService;
        this._router = _router;
        this.zone = zone;
        this.authSubscription = new rxjs_1.Subscription();
    }
    ngOnInit() {
        this.authSubscription = this.authService.userAuthObserver$.subscribe((user) => {
            if (user) {
                this.zone.run(() => {
                    this._router.navigate(["account", "me"]);
                });
            }
        });
    }
    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
};
LoginView = tslib_1.__decorate([
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
          <email-login-controller></email-login-controller>
        </mat-grid-tile>
        <mat-grid-tile
          [attrGridColSpan]="{
            xs: {
              colspan: 1,
              rowspan: 2
            },
            sm: {
              colspan: 1,
              rowspan: 2
            },
            md: {
              colspan: 1,
              rowspan: 2
            },
            lg: {
              colspan: 1,
              rowspan: 2
            },
            xl: {
              colspan: 1,
              rowspan: 2
            }
          }">
          <oauth-login-controller></oauth-login-controller>
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
              rowspan: 2
            },
            lg: {
              colspan: 1,
              rowspan: 2
            },
            xl: {
              colspan: 1,
              rowspan: 2
            }
          }">
          <h3>
            No account?
            <a
              mat-tab-link
              routerLink="../signup">
              Register</a
            >
          </h3>
        </mat-grid-tile>
      </mat-grid-list>
    </div>`,
        styleUrls: ["../auth.style.css"],
    })
], LoginView);
exports.LoginView = LoginView;
//# sourceMappingURL=login.view.js.map