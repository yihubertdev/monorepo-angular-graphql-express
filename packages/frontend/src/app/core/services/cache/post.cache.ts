import { Injectable } from "@angular/core";
import { FireStoreCacheService } from "./basic.cache";
import { IPost } from "sources-types";

@Injectable({ providedIn: "root" })
export class PostCache extends FireStoreCacheService<{
  hasFile: boolean;
  data: IPost[];
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
