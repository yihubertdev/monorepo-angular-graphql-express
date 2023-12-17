import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { CACHE_KEY, POST, IUserFull } from "sources-types";

@Injectable({ providedIn: "root" })
export class HomePagePostCache extends FireStoreCacheService<
  {
    hasFile: boolean;
    data: POST.IPostFull[];
  },
  void
> {
  key = CACHE_KEY.HOME_PAGE;
}

@Injectable({ providedIn: "root" })
export class UserPagePostCache extends FireStoreCacheService<
  {
    hasFile: boolean;
    data: POST.IPost[]; // no need to have displayName and photoURL, do not use IPostFull
  },
  string
> {
  key: string = CACHE_KEY.USER_PAGE;
}

@Injectable({ providedIn: "root" })
export class UserCache extends FireStoreCacheService<IUserFull[], void> {
  key: string = CACHE_KEY.USER_INFO;
}
