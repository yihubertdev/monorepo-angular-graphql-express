import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { IPost, IUser } from "sources-types";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

export const postResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PostFireStore).list(5);
};

export const postByUserResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let userId = route.params["id"];
  console.log("post by user reolsver");
  if (userId == "me") {
    userId = inject(SessionStorageService).getSessionStorage<IUser>(
      "user"
    )?.userId;
  }

  return inject(PostFireStore).list(5, userId);
};

export const userProfileResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(inject(Router).url);
  let userId = route.params["id"];

  return inject(PostFireStore).list(5, userId);
};
