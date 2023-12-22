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
import { User } from "@angular/fire/auth";

export const isUserLogin: CanActivateFn = () => {
  return Boolean(
    inject(SessionStorageService).getSessionStorage<IUser>("user")
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

export const isUserVerified: CanActivateFn = () => {
  const session = inject(SessionStorageService);
  console.log(session.getAllSessionStorage().key(0));
  if (
    !session.getAllSessionStorage().key(0) ||
    session.getAllSessionStorage().key(0)?.includes("firebase")
  ) {
    return false;
  }
  const userAuth = session.getSessionStorage<User>(
    session.getAllSessionStorage().key(0)!
  );

  if (userAuth?.emailVerified) {
    return true;
  }
  return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
};
