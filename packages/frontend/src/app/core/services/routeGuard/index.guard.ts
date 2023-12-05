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

export const isUserLogin: CanActivateFn = () =>
  Boolean(
    inject(SessionStorageService).getSessionStorage<IUser>("user")
      ? true
      : inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN)
  );

export const isMeLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user");

  const id = route.parent?.params["id"];
  console.log(id);
  if (!user && id === "me") {
    return inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
  }
  if (user?.userId == id) {
    return inject(Router).navigate(["users", "me", "posts"]);
  }

  return false;
};

export const isUserLoginToUser: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))
    ? inject(Router).navigate(SITE_ROUTE_PAGE.SETTINGS)
    : true;
