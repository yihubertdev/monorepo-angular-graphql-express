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

export const redirectUserToMe: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user = inject(SessionStorageService).getSessionStorage<IUser>("user")!;
  console.log(route.params["id"]);
  if (user.userId == route.params["id"]) {
    // console.log(route.params["id"]);
    inject(Router).navigate(["users", "me", "posts"]);
    route.params["id"] = "me";
    return true;
  } else {
    return true;
  }
};

export const isMeLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (route.params["id"] === "me") {
    if (
      Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))
    ) {
      return true;
    } else {
      inject(Router).navigate(SITE_ROUTE_PAGE.LOGIN);
      return false;
    }
  }

  return true;
};

export const isUserLoginToUser: CanActivateFn = () =>
  Boolean(inject(SessionStorageService).getSessionStorage<IUser>("user"))
    ? inject(Router).navigate(["users", "me", "posts"])
    : true;
