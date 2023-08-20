import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { isEmpty } from "lodash";
import { POP_UP_ACTION, POP_UP_DISMISS_DURATION } from "../../models/constants";
import { SNACKBAR_LOCATION } from "../../models/layout.type";
import { USER_LOGIN_ERROR } from "../../models/users.type";
import { AuthService } from "../fireAuth/auth";

@Injectable()
export class UserGuardService implements CanActivate {
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
