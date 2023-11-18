import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, IUser } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import { UserCache } from "../cache/extend.cache";

@Injectable({ providedIn: "root" })
export class UserService extends FireStoreBaseModel<IUser> {
  /**
   * Collection Name.
   *
   * @protected
   * @returns {FIRESTORE_COLLECTION} firestore collection
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.users;
  }

  /**
   * Firestore Collection
   *
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IUser>;

  private _userCache: UserCache;

  /**
   * Contructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   * @param {UserCache} userCache cache users
   */
  constructor(firestore: AngularFirestore, userCache: UserCache) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
    this._userCache = userCache;
  }

  /**
   * Retrieve user with verfied email
   *
   * @public
   * @param {number} [limit] list limit number of user
   * @returns {Promise<IUser[]>} user
   */
  public async listUsersWithCache(limit?: number): Promise<IUser[]> {
    const cache = this._userCache.get();

    if (cache) {
      return cache;
    }
    const users = await this.retrieveAll(limit);

    this._userCache.update(users);

    return users;
  }

  /**
   * Retrieve user with verfied email
   *
   * @public
   * @param {string} uId list limit number of user
   * @returns {Promise<IUser[]>} user
   */
  public async listUserWithCache(uId: string): Promise<IUser> {
    let cache = this._userCache.get();
    let cachedUser = cache?.find((u) => u.id == uId);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.retrieveByUId(uId);
    if (!user) {
      throw Error("User not exist");
    }
    cache = cache ? [...cache, user] : [user];
    this._userCache.update(cache);
    return user;
  }

  /**
   * Retrieve user with verfied email
   *
   * @public
   * @param {boolean} verified verified email
   * @returns {Promise<IUser[]>} user
   */
  public getUserWithVerifiedEmail = async (
    verified: boolean
  ): Promise<IUser[]> => {
    const result = await this.collection.ref
      .where("emailVerified", "==", verified)
      .get();
    const data = result.docs.map((item) => item.data());

    return data;
  };

  public override create = async (document: IUser) => {
    await this.collection.doc(document.id).set(document);
    return document.id;
  };

  public async retrieveSubCollection<K>(filter: {
    userId: string;
    collectionId: string;
  }): Promise<{
    data: (K & { documentId: string })[];
    user: QueryDocumentSnapshot<IUser>;
  }> {
    const { userId, collectionId } = filter;
    let query = this.collection.ref.where("userId", "==", userId);

    const [user] = (await query.get()).docs;
    // return document;
    const subCollectionProfile = user.ref.collection(collectionId);

    const profile = await subCollectionProfile.get();

    const document = profile.docs.map((data) => ({
      ...(data.data() as K),
      documentId: data.id,
    }));

    return { data: document, user: user };
  }
}
