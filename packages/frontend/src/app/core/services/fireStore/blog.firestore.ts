import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_CACHE, FIRESTORE_COLLECTION } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import { IArticle, IPost } from "sources-types";
import { PostCache } from "../cache/post.cache";

@Injectable({ providedIn: "root" })
export class PostFireStore extends FireStoreBaseModel<IPost> {
  /**
   * Collection Name.
   *
   * @protected
   * @returns {FIRESTORE_COLLECTION} collection name firestore
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.blogs;
  }

  /**
   * Firestore Collection
   *
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IPost>;

  protected _cache: PostCache;

  /**
   * Contructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   * @param {PostCache} _cache post cache
   */
  constructor(firestore: AngularFirestore, _cache: PostCache) {
    super(firestore);
    this.collection = firestore.collection(this.collectionName());
    this._cache = _cache;
  }

  public async listWithCache(
    limit: number = 10,
    cacheKey: FIRESTORE_CACHE,
    userId?: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const data = this._cache.get(userId ? cacheKey + userId : cacheKey);
    if (data) {
      return data;
    }

    const post = await this.list(limit, userId);
    this._cache.update(userId ? cacheKey + userId : cacheKey, post);
    return post;
  }

  public async listPaginationWithCache(
    limit: number = 10,
    cacheKey: FIRESTORE_CACHE,
    userId?: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const cache = this._cache.get(userId ? cacheKey + userId : cacheKey);
    console.log(cache);
    if (cache && !cache.hasFile) {
      return cache;
    }

    const post = await this.listPagination(limit, userId);

    let data = {
      hasFile: post.hasFile,
      data: cache ? [cache.data, post.data].flat() : post.data,
    };

    this._cache.update(userId ? cacheKey + userId : cacheKey, data);
    return data;
  }
}

@Injectable({ providedIn: "root" })
export class ArticleFireStore extends FireStoreBaseModel<IArticle> {
  /**
   * Collection Name.
   *
   * @protected
   * @returns {FIRESTORE_COLLECTION} collection name firestore
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.article;
  }

  /**
   * Firestore Collection
   *
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IArticle>;

  /**
   * Constructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   */
  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
  }
}
