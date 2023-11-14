import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { CACHE_KEY, IPost } from "sources-types";

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

  public getPost(userId: string):
    | {
        hasFile: boolean;
        data: IPost[];
      }
    | undefined {
    this.key = userId;
    return this.get();
  }

  public updatePost(
    value: {
      hasFile: boolean;
      data: IPost[];
    },
    userId: string
  ) {
    this.key = userId;
    super.update(value);
  }
}
