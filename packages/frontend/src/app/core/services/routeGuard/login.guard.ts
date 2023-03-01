import { Injectable, NgZone } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { takeWhile } from "rxjs";
import { AuthService } from "../fireAuth/auth";

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    private _router: Router,
    private authService: AuthService,
    private zone: NgZone
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.userAuthObserver$
        .pipe(takeWhile((user) => user === null))
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
}
