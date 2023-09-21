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
      this.authService.userAuthObserver$.subscribe((user) =>
        user ? this._router.navigateByUrl("account/me") : resolve(true)
      );
    });
  }
}
