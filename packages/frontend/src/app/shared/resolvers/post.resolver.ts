import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { IPost } from "sources-types";
import { PostFireStore } from "src/app/core/services/fireStore/blog.firestore";

export const postResolver: ResolveFn<{
  data: IPost[];
  hasFile: boolean;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(route);
  return inject(PostFireStore).list(5);
};
