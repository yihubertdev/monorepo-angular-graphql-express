import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, IUser } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import { IArticle, IPost } from "sources-types";
import {
  HomePagePostCache,
  UserCache,
  UserPagePostCache,
} from "../cache/extend.cache";
import { keyBy } from "../../utils/lodash";

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

  protected _userCache: UserCache;

  /**
   * Contructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   * @param {HomePagePostCache} _homePageCache post cache
   * @param {UserPagePostCache} _userPageCache post cache
   * @param {UserCache} _userCache post cache
   */
  constructor(
    firestore: AngularFirestore,
    _homePageCache: HomePagePostCache,
    _userPageCache: UserPagePostCache,
    _userCache: UserCache
  ) {
    super(firestore);
    this.collection = firestore.collection(this.collectionName());
    this._homePageCache = _homePageCache;
    this._userPageCache = _userPageCache;
    this._userCache = _userCache;
  }

  public deletePost(userId: string, id: string) {
    this._userPageCache.delete(userId);
    this._homePageCache.delete();
    super.delete(id);
  }

  public override create(document: IPost): string {
    this._userPageCache.delete(document.userId);
    this._homePageCache.delete();
    return super.create(document);
  }

  public async listUserPagePostCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const data = this._userPageCache.get(userId);
    if (data) {
      return data;
    }
    const post = await this.list(limit, [userId]);
    this._userPageCache.update(post, userId);
    return post;
  }

  public async listHomePagePostCache(
    limit: number = 10,
    users: IUser[]
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const data = this._homePageCache.get();
    if (data) {
      return data;
    }
    const groupedData = keyBy(users, "userId");
    console.log(groupedData);
    let post = await this.list(limit, Object.keys(groupedData));
    post.data = post.data.map((item) => ({
      ...item,
      displayName: groupedData[item.userId]!.displayName, // user display name
      photoURL: groupedData[item.userId]!.photoURL, // user photo url
    }));
    console.log(post);
    this._homePageCache.update(post);
    return post;
  }

  public async listUserPaginationWithCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const cache = this._userPageCache.get(userId);
    if (cache && !cache.hasFile) {
      return cache;
    }
    const post = await this.listPagination(limit, [userId]);
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

    this._userPageCache.update(result, userId);
    return result;
  }

  public async listHomePaginationWithCache(
    limit: number = 10
  ): Promise<{ hasFile: boolean; data: IPost[] }> {
    const cache = this._homePageCache.get();
    if (cache && !cache.hasFile) {
      return cache;
    }
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
