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

export const loginCheck: CanActivateFn = () => {
  const session = inject(SessionStorageService);
  const fireauth = session.getAllSessionStorage().key(0);
  if (!fireauth || !fireauth?.includes("firebase")) {
    return true;
  }
  const userAuth = session.getSessionStorage<User>(fireauth);

  if (userAuth?.emailVerified && userAuth?.phoneNumber) {
    return inject(Router).navigate(SITE_ROUTE_PAGE.SETTINGS);
  }
  return true;
};

export const isUserVerified: CanActivateFn = () => {
  const session = inject(SessionStorageService);
  const fireauth = session.getAllSessionStorage().key(0);
  if (!fireauth || !fireauth?.includes("firebase")) {
    return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
  }
  const userAuth = session.getSessionStorage<User>(fireauth);

  if (userAuth?.emailVerified && userAuth?.phoneNumber) {
    return true;
  }
  return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
};
