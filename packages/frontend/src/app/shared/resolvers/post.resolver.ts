import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { CACHE_KEY, IPost, IUser } from "sources-types";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";
import { UserService } from "../../core/services/fireStore/users.firestore";

export const postResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  inject(UserService).retrieveById("dTmyUvdTRrf7budhjvFLOGio79i2");
  return inject(PostFireStore).listHomePagePostCache(5);
};

export const usersResolver: ResolveFn<IUser[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserService).listUsersWithCache(10);
};

export const postByUserResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let userId = route.params["id"];
  if (userId == "me") {
    userId = inject(SessionStorageService).getSessionStorage<IUser>(
      "user"
    )?.userId;
  }

  return inject(PostFireStore).listUserPagePostCache(5, userId);
};

export const userProfileResolver: ResolveFn<IUser | undefined> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userId = route.params["id"] ?? route.firstChild?.params["id"];

  if (userId !== "me") {
    const [user] = await inject(UserService).retrieve({
      userId,
    });

    return user;
  } else {
    return inject(SessionStorageService).getSessionStorage<IUser>("user");
  }
};

export const loggedUserProfileResolver: ResolveFn<IUser> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(SessionStorageService).getSessionStorage<IUser>("user")!;
};
