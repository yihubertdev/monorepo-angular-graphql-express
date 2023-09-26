import { Injectable, NgZone, inject } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from "@angular/router";
import { SessionStorageService } from "../browserStorage/sessionStorage";

export const isUserLogin: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getAllSessionStorage().length)
    ? true
    : inject(Router).navigate(["users", "login"]);
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
