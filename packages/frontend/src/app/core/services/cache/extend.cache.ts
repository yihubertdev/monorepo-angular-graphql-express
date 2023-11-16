import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { CACHE_KEY, IPost, IUser } from "sources-types";

@Injectable({ providedIn: "root" })
export class HomePagePostCache extends FireStoreCacheService<{
  hasFile: boolean;
  data: IPost[];
}> {
  key = CACHE_KEY.HOME_PAGE;
  /**
   * Contructor
   *
   * @protected
   */
  constructor() {
    super();
  }
}

@Injectable({ providedIn: "root" })
export class UserPagePostCache extends FireStoreCacheService<{
  hasFile: boolean;
  data: IPost[];
}> {
  key: string = CACHE_KEY.USER_PAGE;
  /**
   * Contructor
   *
   * @protected
   */
  constructor() {
    super();
  }
}

@Injectable({ providedIn: "root" })
export class UserCache extends FireStoreCacheService<IUser[]> {
  key: string = CACHE_KEY.USER_INFO;
  /**
   * Contructor
   *
   * @protected
   */
  constructor() {
    super();
  }
}
