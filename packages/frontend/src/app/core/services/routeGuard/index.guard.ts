import { Injectable, NgZone, inject } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from "@angular/router";
import { SessionStorageService } from "../browserStorage/sessionStorage";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACKBAR_ACTION, SNACKBAR_ERROR } from "sources-types";

export const isUserLogin: CanActivateFn = () => {
  if (Boolean(inject(SessionStorageService).getAllSessionStorage().length)) {
    return true;
  } else {
    inject(MatSnackBar).open(
      SNACKBAR_ERROR.USER_LOGIN_ERROR,
      SNACKBAR_ACTION.POP_UP_ACTION,
      {
        duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
        horizontalPosition: SNACKBAR_ACTION.CENTER,
        verticalPosition: SNACKBAR_ACTION.TOP,
      }
    );
    inject(Router).navigate(["users", "login"]);
    return false;
  }
};

export const isUserLoginToUser: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getAllSessionStorage().length)
    ? inject(Router).navigate(["users", "me", "posts"])
    : true;

@Injectable()
export class LoginGuardService {
  constructor(
    private _router: Router,
    private zone: NgZone,
    private _sessionStorage: SessionStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.zone.run(() => {
        resolve(true);
      });
    });
  }
}
