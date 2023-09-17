import { Injectable, NgZone } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../fireAuth/auth";

@Injectable()
export class LoginGuardService {
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
        //takeWhile allow values until value from source is return false, then complete
        .subscribe((user) => {
          if (user?.id) {
            this.zone.run(() => {
              this._router.navigateByUrl("account/me");
            });

            resolve(false);
          }
          resolve(true);
        });
    });
  }
}
