import { inject } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from "@angular/router";
import { SessionStorageService } from "../browserStorage/sessionStorage";
import { IUser } from "sources-types";
import { SITE_ROUTE_PAGE } from "../../static/menu.static";
import { AuthService } from "../fireAuth/auth";

export const isUserLogin: CanActivateFn = () => {
  return Boolean(
    inject(SessionStorageService).getAllSessionStorage().length
      ? true
      : inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN)
  );
};

export const isMeLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user");

  const id = route.parent?.params["id"];
  if (!user && id === "me") {
    return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
  }
  if (user?.userId == id) {
    return inject(Router).navigate(["users", "profile", "me", "posts"]);
  }

  return true;
};

export const isUserLoginToUser: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))
    ? inject(Router).navigate(SITE_ROUTE_PAGE.SETTINGS)
    : true;

export const isUserVerified: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const user = authService.getAuth();
  if (!user) {
    return false;
  }

  if (!authService.isUserVerified(user)) {
    return inject(Router).navigate(["users", "profile-signup"]);
  }

  return true;
};
