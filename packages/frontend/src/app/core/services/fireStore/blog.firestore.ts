import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { CACHE_KEY, FIRESTORE_COLLECTION } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import { IArticle, IPost } from "sources-types";
import { HomePagePostCache, UserPagePostCache } from "../cache/post.cache";

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

  protected _homePageCache: HomePagePostCache;

  protected _userPageCache: UserPagePostCache;

  /**
   * Contructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   * @param {HomePagePostCache} _homePageCache post cache
   * @param {UserPagePostCache} _userPageCache post cache
   */
  constructor(
    firestore: AngularFirestore,
    _homePageCache: HomePagePostCache,
    _userPageCache: UserPagePostCache
  ) {
    super(firestore);
    this.collection = firestore.collection(this.collectionName());
    this._homePageCache = _homePageCache;
    this._userPageCache = _userPageCache;
  }

  public async listUserPagePostCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const data = this._userPageCache.getPost(userId);
    if (data) {
      return data;
    }

    const post = await this.list(limit, userId);
    this._userPageCache.updatePost(post, userId);
    return post;
  }

  public async listHomePagePostCache(
    limit: number = 10
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const data = this._homePageCache.get();
    if (data) {
      return data;
    }
    console.log("load");
    const post = await this.list(limit);
    this._homePageCache.update(post);
    return post;
  }

  public async listUserPaginationWithCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const cache = this._userPageCache.getPost(userId);
    if (cache && !cache.hasFile) {
      return cache;
    }
    console.log("load");
    const post = await this.listPagination(limit, userId);
    let data: IPost[] = [];
    if (cache) {
      data = cache.data;
      data.push(...post.data);
    } else {
      data = post.data;
    }

    const result = {
      hasFile: post.hasFile,
      data,
    };

    this._userPageCache.updatePost(result, userId);
    return result;
  }

  public async listHomePaginationWithCache(
    limit: number = 10
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const cache = this._homePageCache.get();
    if (cache && !cache.hasFile) {
      return cache;
    }
    console.log("load");
    const post = await this.listPagination(limit);
    let data: IPost[] = [];
    if (cache) {
      data = cache.data;
      data.push(...post.data);
    } else {
      data = post.data;
    }

    const result = {
      hasFile: post.hasFile,
      data,
    };

    this._homePageCache.update(result);
    return result;
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
