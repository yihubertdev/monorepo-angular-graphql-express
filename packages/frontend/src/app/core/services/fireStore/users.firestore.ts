import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, IUser, IUserFull } from "type-sources";
import { FireStoreBaseModel } from "./basic.firestore";
import { UserCache } from "../cache/extend.cache";

@Injectable({ providedIn: "root" })
export class UserService extends FireStoreBaseModel<IUser> {
  /**
   * Collection Name.
   * @protected
   * @returns {FIRESTORE_COLLECTION} firestore collection
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.users;
  }

  public serializer(input: IUser): IUser {
    return input;
  }

  /**
   * Firestore Collection
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IUser>;

  private _userCache: UserCache;

  /**
   * Contructor
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
   * @public
   * @param {number} [limit] list limit number of user
   * @returns {Promise<IUserFull[]>} user
   */
  public async listUsersWithCache(limit: number): Promise<IUserFull[]> {
    const cache = this._userCache.get();

    if (cache) {
      return cache;
    }
    const result = await this.collection.ref.limit(limit).get();

    const users: IUserFull[] = result.docs.map((data) => ({
      ...data.data(),
      uid: data.id,
    }));
    this._userCache.update(users);

    return users;
  }

  /**
   * Retrieve user with verfied email
   * @public
   * @returns {IUser[]} user
   */
  public listUsersCache(): IUser[] | undefined {
    return this._userCache.get();
  }

  public override async update({
    document,
    uid,
  }: {
    document: Partial<IUser>;
    uid: string;
  }) {
    super.update({
      document,
      uid,
    });
    this._userCache.delete();
  }

  /**
   * Retrieve user with verfied email
   * @public
   * @param {string} userId list limit number of user
   * @returns {Promise<IUser[]>} user
   */
  public async listUserByUserIdWithCache(userId: string): Promise<IUser> {
    let cache = this._userCache.get();

    const cachedUser = cache?.find((u) => u.userId == userId);
    if (cachedUser) {
      return cachedUser;
    }

    const result = await this.collection.ref
      .where("userId", "==", userId)
      .get();

    const [data] = result.docs;
    if (!data) {
      throw Error("User not exist");
    }
    const user = { ...data.data(), uid: data.id };

    cache = cache ? [...cache, user] : [user];
    this._userCache.update(cache);
    return user;
  }

  public async listUserByUserIdWithUId(uid: string): Promise<IUser> {
    let cache = this._userCache.get();

    const cachedUser = cache?.find((u) => u.uid == uid);
    if (cachedUser) {
      return cachedUser;
    }

    const data = await super.retrieveByUId(uid);
    if (!data) {
      throw Error("User not exist");
    }
    const user = { ...data, uid };

    cache = cache ? [...cache, user] : [user];
    this._userCache.update(cache);
    return user;
  }

  /**
   * Retrieve user with verfied email
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

  public override async create({
    document,
    id,
  }: {
    document: IUser;
    id: string;
  }) {
    await this.collection.doc(id).set(document);
  }

  public async retrieveSubCollection<K>(filter: {
    userId: string;
    collectionId: string;
  }): Promise<{
    data: (K & { documentId: string })[];
    user: QueryDocumentSnapshot<IUser>;
  }> {
    const { userId, collectionId } = filter;
    const query = this.collection.ref.where("userId", "==", userId);

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
