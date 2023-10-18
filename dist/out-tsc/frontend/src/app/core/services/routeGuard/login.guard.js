"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginGuardService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoginGuardService = class LoginGuardService {
    constructor(_router, authService, zone) {
        this._router = _router;
        this.authService = authService;
        this.zone = zone;
    }
    canActivate(next, state) {
        return new Promise((resolve) => {
            this.authService.userAuthObserver$
                .pipe((0, rxjs_1.takeWhile)((user) => user === null))
                .subscribe({
                complete: () => {
                    const currentUser = this.authService.get()?.toJSON();
                    if (currentUser) {
                        this.zone.run(() => {
                            this._router.navigateByUrl("account/me");
                        });
                        resolve(false);
                    }
                    resolve(true);
                },
            });
        });
    }
};
LoginGuardService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], LoginGuardService);
exports.LoginGuardService = LoginGuardService;
//# sourceMappingURL=login.guard.js.map