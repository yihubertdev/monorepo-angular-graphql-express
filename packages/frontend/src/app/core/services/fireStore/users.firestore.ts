import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";
import {
  FIRESTORE_COLLECTION,
  IProfile,
  IProfileHomeAddress,
  IUser,
} from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import joiValidator from "../../utils/validator";
import {
  deleteCollectionBuilderSchema,
  subCollectionBuilderSchema,
} from "../../joiSchema/sub-collection.schema";
import { ICollectionQueryBuilder } from "sources-types";
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

  public retrieveSubCollection = async (filter: {
    userId: string;
    collectionId: string;
  }): Promise<{
    data: IProfileHomeAddress[];
    user: QueryDocumentSnapshot<IUser>;
  }> => {
    const { userId, collectionId } = filter;
    let query = this.collection.ref.where("userId", "==", userId);

    const [user] = (await query.get()).docs;
    // return document;
    const subCollectionProfile = user.ref.collection(collectionId);

    const profile = await subCollectionProfile.get();

    const document = profile.docs.map((data) => ({
      ...data.data(),
      documentId: data.id,
    }));

    return { data: document as IProfileHomeAddress[], user: user };
  };

  protected buildSubCollection(
    queries: CollectionReference<DocumentData>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): any {
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);

    return next
      ? this.buildSubCollection(
          newQueries.collection(collectionId as string),
          next
        )
      : newQueries.set(documentValue as IProfileHomeAddress);
  }

  public addSubCollectionByUserId(
    user: QueryDocumentSnapshot<IUser>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): void {
    joiValidator.parameter({
      data: queryBuilder,
      schemaGenerator: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    return next
      ? this.buildSubCollection(collection, next)
      : collection.doc(documentId).set(documentValue as IProfile);
  }

  protected buildRemoveSubCollection(
    queries: CollectionReference<DocumentData>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): any {
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);

    return next
      ? this.buildRemoveSubCollection(
          newQueries.collection(collectionId as string),
          next
        )
      : newQueries.delete();
  }

  public deleteSubCollectionDocumentByUserId(
    user: QueryDocumentSnapshot<IUser>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): void {
    joiValidator.parameter({
      data: queryBuilder,
      schemaGenerator: deleteCollectionBuilderSchema,
    });
    const { documentId, collectionId, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    return next
      ? this.buildRemoveSubCollection(collection, next)
      : collection.doc(documentId).delete();
  }

  protected buildSubCollectionUpdator(
    queries: CollectionReference<DocumentData>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): any {
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);
    console.log(newQueries);
    return next
      ? this.buildSubCollectionUpdator(
          newQueries.collection(collectionId as string),
          next
        )
      : newQueries.update(documentValue as IProfile);
  }

  public updateSubCollectionByUserId(
    user: QueryDocumentSnapshot<IUser>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): void {
    joiValidator.parameter({
      data: queryBuilder,
      schemaGenerator: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    return next
      ? this.buildSubCollectionUpdator(collection, next)
      : collection.doc(documentId).update(documentValue as IProfile);
  }
}
