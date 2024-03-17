import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { POST, IUser, IRoom } from "type-sources";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { RoomService } from "../../core/services/fireStore/room.firestore";
import { DocumentReference } from "@angular/fire/compat/firestore";

export const homePagePostResolver: ResolveFn<{
  data: POST.IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PostFireStore).listHomePageImagePostCache(10);
};

export const usersResolver: ResolveFn<IUser[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserService).listUsersWithCache(10);
};

export const postByUserResolver: ResolveFn<{
  data: POST.IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let userId = route.parent?.parent?.params["id"];
  if (userId == "me") {
    userId = inject(SessionStorageService).getSessionStorage<IUser>("user")
      ?.userId;
  }

  return inject(PostFireStore).listUserPagePostCache(5, userId);
};

export const userProfileResolver: ResolveFn<IUser | undefined> = async (
  route: ActivatedRouteSnapshot,

) => {
  const userId = route.params["id"] ?? route.firstChild?.params["id"];
  if (userId !== "me") {
    return inject(UserService).listUserByUserIdWithCache(userId);
  } else {
    return inject(SessionStorageService).getSessionStorage<IUser>("user");
  }
};

export const loggedUserProfileResolver: ResolveFn<IUser> = async () => {
  const userId = inject(SessionStorageService).getSessionStorage<IUser>(
    "user"
  )!.userId;

  return inject(UserService).listUserByUserIdWithCache(userId);
};

export const roomResolver: ResolveFn<DocumentReference<IRoom.IBase>> = (
  route: ActivatedRouteSnapshot,
) => {
  const roomId = route.params["roomId"];

  return inject(RoomService).retrieveRoom(roomId);
};
