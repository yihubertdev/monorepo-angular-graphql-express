import { inject } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  CanMatchFn,
  UrlSegment,
  Route,
} from "@angular/router";
import { SessionStorageService } from "../browserStorage/sessionStorage";
import { IUser } from "sources";
import { SITE_ROUTE_PAGE } from "../../static/menu.static";
import { User } from "@angular/fire/auth";

export const replaceUserId: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user");
  if (segments[1].path === user?.userId) {
    inject(Router).navigate([
      "users",
      ...segments.map((item, index) => {
        return index === 1 ? "me" : item.path;
      }),
    ]);
    return false;
  }

  return true;
};

export const isMeLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user");

  const id = route.parent?.parent?.params["id"];
  if (!user && id === "me") {
    return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
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

export const isUserVerified: CanMatchFn = () => {
  const session = inject(SessionStorageService);
  const fireauth = session.getAllSessionStorage().key(0);
  if (!fireauth || !fireauth?.includes("firebase")) {
    return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
  }
  const userAuth = session.getSessionStorage<User>(fireauth);

  if (userAuth?.emailVerified && userAuth?.phoneNumber) {
    return true;
  }
  inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
  return false;
};
