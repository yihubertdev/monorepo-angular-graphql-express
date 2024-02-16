import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, POST, IArticle } from "sources";
import { FireStoreBaseModel } from "./basic.firestore";
import {
  HomePagePostCache,
  UserCache,
  UserPagePostCache,
} from "../cache/extend.cache";
import { keyBy } from "../../utils/lodash";
import { v4 as uuidv4 } from "uuid";

@Injectable({ providedIn: "root" })
export class PostFireStore extends FireStoreBaseModel<POST.IPost> {
  /**
   * Collection Name.
   * @protected
   * @returns {FIRESTORE_COLLECTION} collection name firestore
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.blogs;
  }

  public serializer(
    input:
      | Omit<POST.IImage, "id" | "createdAt" | "updatedAt">
      | Omit<POST.IVideo, "id" | "createdAt" | "updatedAt">
      | Omit<POST.IPreview, "id" | "createdAt" | "updatedAt">
      | Omit<POST.IText, "id" | "createdAt" | "updatedAt">
  ): POST.IPost {
    return {
      ...input,
      id: uuidv4(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
  }

  /**
   * Firestore Collection
   * @protected
   */
  protected override collection: AngularFirestoreCollection<POST.IPost>;

  protected _homePageCache: HomePagePostCache;

  protected _userPageCache: UserPagePostCache;

  protected _userCache: UserCache;

  /**
   * Contructor
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

  public override async create({
    document,
  }: {
    document: POST.IPost;
  }): Promise<void> {
    this._userPageCache.delete(document.userId);
    this._homePageCache.delete();
    await super.create({ document });
  }

  public async listUserPagePostCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: POST.IPost[] }> {
    const data = this._userPageCache.get(userId);
    if (data) {
      return data;
    }
    const post = await this.list(limit, [userId]);
    this._userPageCache.update(post, userId);
    return post;
  }

  public async listHomePagePostCache(
    limit: number = 10
  ): Promise<{ hasFile: boolean; data: POST.IPostFull[] }> {
    const data = this._homePageCache.get();
    if (data) {
      return data;
    }
    const users = this._userCache.get();
    const groupedData = keyBy(users!, "userId");
    let post = await this.list(limit, Object.keys(groupedData));

    const postFull: { hasFile: boolean; data: POST.IPostFull[] } = {
      hasFile: post.hasFile,
      data: post.data.map((item) => ({
        ...item,
        displayName: groupedData[item.userId]!.displayName, // user display name
        photoURL: groupedData[item.userId]!.photoURL, // user photo url
      })),
    };
    this._homePageCache.update(postFull);
    return postFull;
  }

  public async listHomePageImagePostCache(
    limit: number = 10
  ): Promise<{ hasFile: boolean; data: POST.IPostFull[] }> {
    const data = this._homePageCache.get();
    if (data) {
      return data;
    }
    const users = this._userCache.get();
    const groupedData = keyBy(users!, "userId");
    const post = await this.listPostContainImage(
      limit,
      Object.keys(groupedData)
    );
    const postFull: { hasFile: boolean; data: POST.IPostFull[] } = {
      hasFile: post.hasFile,
      data: post.data.map((item) => ({
        ...item,
        displayName: groupedData[item.userId]!.displayName, // user display name
        photoURL: groupedData[item.userId]!.photoURL, // user photo url
      })),
    };
    this._homePageCache.update(postFull);
    return postFull;
  }

  public async listUserPaginationWithCache(
    limit: number = 10,
    userId: string
  ): Promise<{ hasFile: boolean; data: POST.IPost[] }> {
    const cache = this._userPageCache.get(userId);
    if (cache && !cache.hasFile) {
      return cache;
    }
    const post = await this.listPagination(limit, [userId]);
    let data: POST.IPost[] = [];
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
  ): Promise<{ hasFile: boolean; data: POST.IPostFull[] }> {
    const cache = this._homePageCache.get();
    if (cache && !cache.hasFile) {
      return cache;
    }
    const users = this._userCache.get();
    const groupedData = keyBy(users!, "userId");
    const post = await this.listImagePagination(
      limit,
      Object.keys(groupedData)
    );
    const postFull: { hasFile: boolean; data: POST.IPostFull[] } = {
      hasFile: post.hasFile,
      data: post.data.map((item) => ({
        ...item,
        displayName: groupedData[item.userId]!.displayName, // user display name
        photoURL: groupedData[item.userId]!.photoURL, // user photo url
      })),
    };

    let data: POST.IPostFull[] = [];
    if (cache) {
      data = cache.data;
      data.push(...postFull.data);
    } else {
      data = postFull.data;
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
   * @protected
   * @returns {FIRESTORE_COLLECTION} collection name firestore
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.article;
  }

  public serializer(
    input: Omit<IArticle, "id" | "createdAt" | "updatedAt">
  ): IArticle {
    return {
      ...input,
      id: uuidv4(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
  }

  /**
   * Firestore Collection
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IArticle>;

  /**
   * Constructor
   * @protected
   * @param {AngularFirestore} firestore firestore
   */
  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
  }
}
