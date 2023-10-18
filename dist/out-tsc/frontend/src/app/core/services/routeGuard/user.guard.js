"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuardService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const lodash_1 = require("lodash");
const constants_1 = require("../../models/constants");
const layout_type_1 = require("../../models/layout.type");
const users_type_1 = require("../../models/users.type");
let UserGuardService = class UserGuardService {
    constructor(_router, authService, zone, _snackBar) {
        this._router = _router;
        this.authService = authService;
        this.zone = zone;
        this._snackBar = _snackBar;
    }
    /**
     *
     * @param {ActivatedRouteSnapshot}next route snapshot
     * @param {RouterStateSnapshot}state route state
     * @returns {Promise<boolean>} route check status
     */
    canActivate(next, state) {
        console.log("trigger");
        return new Promise((resolve) => {
            this.authService.userAuthObserver$.subscribe({
                next: (user) => {
                    console.log(user);
                    if (!user || (0, lodash_1.isEmpty)(user?.id)) {
                        this.zone.run(() => {
                            this._router.navigateByUrl("account/login");
                            this._snackBar.open(users_type_1.USER_LOGIN_ERROR, constants_1.POP_UP_ACTION, {
                                duration: constants_1.POP_UP_DISMISS_DURATION,
                                horizontalPosition: layout_type_1.SNACKBAR_LOCATION.CENTER,
                                verticalPosition: layout_type_1.SNACKBAR_LOCATION.TOP,
                            });
                        });
                        resolve(false);
                    }
                    resolve(true);
                },
            });
        });
    }
};
UserGuardService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], UserGuardService);
exports.UserGuardService = UserGuardService;
//# sourceMappingURL=user.guard.js.map