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
    return new Promise((resolve) =>
      this.authService.get() ? resolve(true) : resolve(false)
    );
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
        next.params["id"] === this.authService.get()?.id
          ? this._router.navigateByUrl("account/me")
          : resolve(false);
      });
    });
  }
}
