import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { IUser, SETTING_COLLECTION } from "type-sources";

import { UserService } from "../../core/services/fireStore/users.firestore";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { User } from "@angular/fire/auth";
import { NetWorthService } from "src/app/core/services/fireStore/networth.firestore";

export const SecurityResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.parent?.data["user"];
  return inject(UserService).retrieveSubCollection({
    userId: user.userId,
    collectionId: SETTING_COLLECTION.SECURITY,
  });
};

export const PersonalProfileResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.parent?.data["user"];

  return inject(UserService).retrieveSubCollection({
    userId: user.userId,
    collectionId: SETTING_COLLECTION.PERSONAL_PROFILE,
  });
};

export const PersonalResumeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.parent?.data["user"];

  return inject(UserService).retrieveSubCollection({
    userId: user.userId,
    collectionId: SETTING_COLLECTION.PERSONAL_RESUME,
  });
};

export const BusinessProfileResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.parent?.data["user"];

  return inject(UserService).retrieveSubCollection({
    userId: user.userId,
    collectionId: SETTING_COLLECTION.PERSONAL_RESUME,
  });
};

export const PersonalNetWorthResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: IUser = route.parent?.parent?.data["user"];

  return inject(UserService).retrieveSubCollection({
    userId: user.userId,
    collectionId: SETTING_COLLECTION.PERSONAL_NET_WORTH,
  });
};

export const NetWorthResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user: User = inject(AuthService).getAuth()!;

  return inject(NetWorthService).retrieveByUId(user.uid);
};
