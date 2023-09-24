import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../fireAuth/auth";

@Injectable()
export class UserGuardService {
  constructor(
    private _router: Router,
    private authService: AuthService,
    private zone: NgZone,
    private _snackBar: MatSnackBar
  ) {}

  /**
   *
   * @param {ActivatedRouteSnapshot}next route snapshot
   * @param {RouterStateSnapshot}state route state
   * @returns {Promise<boolean>} route check status
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.userAuthObserver$.subscribe((user) => {
        console.log(user);
        resolve(true);
      });
    });
  }
}

@Injectable()
export class IsMeRouteGuard {
  constructor(
    private _router: Router,
    private authService: AuthService,
    private zone: NgZone,
    private _snackBar: MatSnackBar
  ) {}

  /**
   *
   * @param {ActivatedRouteSnapshot}next route snapshot
   * @param {RouterStateSnapshot}state route state
   * @returns {Promise<boolean>} route check status
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.zone.run(() => {
        next.params["id"] === this.authService.get()?.userId
          ? this._router.navigate(["/account", "users", "me", "posts"])
          : resolve(true);
      });
    });
  }
}
