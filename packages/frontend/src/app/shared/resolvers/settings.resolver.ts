import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { IPost, IProfileHomeAddress, IUser } from "sources-types";
import { SessionStorageService } from "../../core/services/browserStorage/sessionStorage";
import { PostFireStore } from "../../core/services/fireStore/blog.firestore";
import { UserService } from "../../core/services/fireStore/users.firestore";
import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export const settingsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.data["user"];

  return inject(UserService).retrieveSubCollectionProfile({
    userId: user.userId,
  });
};
