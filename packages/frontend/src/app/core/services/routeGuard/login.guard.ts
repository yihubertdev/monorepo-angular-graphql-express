import { Injectable, NgZone } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../fireAuth/auth";
import { UserSignalsStateService } from "../signal/userAuth.signal";

@Injectable()
export class LoginGuardService {
  constructor(
    private _router: Router,
    private authService: AuthService,
    private zone: NgZone,
    private userSignal: UserSignalsStateService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(this.userSignal.state);
      this.authService.userAuthObserver$.subscribe((user) =>
        user ? this._router.navigateByUrl("account/me") : resolve(true)
      );
    });
  }
}
