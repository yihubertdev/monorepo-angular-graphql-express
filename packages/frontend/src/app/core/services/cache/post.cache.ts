import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { IPost } from "sources-types";

@Injectable({ providedIn: "root" })
export class PostFireStore extends FireStoreCacheService<{
  hasFile: Boolean;
  data: IPost;
}> {
  /**
   * Contructor
   *
   * @protected
   */
  constructor() {
    super();
  }
}
