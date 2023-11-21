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

export const isUserLogin: CanActivateFn = () => {
  if (Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))) {
    return true;
  } else {
    inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
    return false;
  }
};

export const isMeLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user");

  const id = route.params["id"];
  if (!user && id === "me") {
    inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
    return false;
  }
  if (user?.userId == id) {
    inject(Router).navigate(["users", "me", "posts"]);
  }

  return true;
};

export const isUserLoginToUser: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))
    ? inject(Router).navigate(["users", "me", "posts"])
    : true;
