import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { CACHE_KEY, POST, IUserFull } from "sources-types";

@Injectable({ providedIn: "root" })
export class HomePagePostCache extends FireStoreCacheService<
  {
    hasFile: boolean;
    data: POST.IPost[];
  },
  void
> {
  key = CACHE_KEY.HOME_PAGE;
}

@Injectable({ providedIn: "root" })
export class UserPagePostCache extends FireStoreCacheService<
  {
    hasFile: boolean;
    data: POST.IPost[];
  },
  string
> {
  key: string = CACHE_KEY.USER_PAGE;
}

@Injectable({ providedIn: "root" })
export class UserCache extends FireStoreCacheService<IUserFull[], void> {
  key: string = CACHE_KEY.USER_INFO;
}
