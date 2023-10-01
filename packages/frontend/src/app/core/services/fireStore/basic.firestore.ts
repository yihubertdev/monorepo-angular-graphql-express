import { Injectable, Query } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";
import { firstValueFrom } from "rxjs";
import { FIRESTORE_COLLECTION } from "sources-types";
import { v4 as uuidv4 } from "uuid";
import getTime from "date-fns/getTime";
import { ICollectionQueryBuilder } from "sources-types";
import joiValidator from "../../utils/validator";
import { subCollectionBuilderSchema } from "../../joiSchema/sub-collection.schema";

@Injectable()
export abstract class FireStoreBaseModel<T> {
  /**
   * Collection Name.
   *
   * @protected
   */
  protected abstract collectionName(): FIRESTORE_COLLECTION;

  /**
   * Firestore Collection
   *
   * @protected
   */
  protected collection: AngularFirestoreCollection<T>;

  //Save last document in query document snapshot received. Type set to any first, since firestore.QueryDocumentSnapshot<T> not exported in compat version
  protected lastQueryDocumentSnapshot?: QueryDocumentSnapshot<T>;

  constructor(protected firestore: AngularFirestore) {
    this.collection = this.firestore.collection(this.collectionName());
  }

  /**
   * Retrieve all documents from collection
   *
   * @public
   * @returns {Promise<T[]>} retrieve all document
   */
  public retrieveAll = async (): Promise<T[]> => {
    const result = await firstValueFrom(this.collection.valueChanges());

    return result;
  };

  /**
   * Retrieve document from collection by docs id
   *
   * @param {string} id document id
   * @public
   * @returns {Promise<any>} retrieve
   */
  public retrieveById = async (id: string): Promise<T> => {
    const result = await firstValueFrom(this.collection.doc(id).get());

    // return document;
    return result.data() as T;
  };

  /**
   * Retrieve document from collection by docs id
   *
   * @public
   * @param {string} filter document user id
   * @param {string} [filter.userId] document user id
   * @returns {Promise<T[]>} retrieve
   */
  public retrieve = async (filter: { userId?: string }): Promise<T[]> => {
    const { userId } = filter;
    let query = this.collection.ref.where("userId", "==", userId);

    const result = await query.get();
    // return document;
    return result.docs.map((data) => data.data());
  };

  /**
   * Create document in that collection
   *
   * @public
   * @param {T} document create document
   * @returns {Promise<void>}
   */
  public create = async (document: T): Promise<string> => {
    const id = uuidv4();
    await this.collection.doc(id).set({
      ...document,
      id,
      createdAt: getTime(new Date()),
      updatedAt: getTime(new Date()),
    });
    return id;
  };

  protected buildSubCollectionQuery = (
    queries: AngularFirestoreCollection<T>,
    queryBuilder: ICollectionQueryBuilder<T>
  ): any => {
    joiValidator.parameter({
      data: queryBuilder,
      schemaGenerator: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);

    return next
      ? this.buildSubCollectionQuery(
          newQueries.collection(collectionId as string),
          next
        )
      : newQueries.set(documentValue as any);
  };

  /**
   * Create document in that collection
   *
   * @public
   * @param {ISubCollectionQuery<T>} queryBuilder create document
   * @returns {void}
   */
  public createSubCollection = (
    queryBuilder: ICollectionQueryBuilder<T>
  ): void => {
    this.buildSubCollectionQuery(this.collection, queryBuilder);
  };

  /**
   * Create document in that collection
   *
   * @public
   * @param {T} document update document
   * @returns {Promise<void>}
   */
  public update = async (
    document: Partial<T> & { id: string }
  ): Promise<void> => {
    await this.collection.doc(document.id).update(document);
  };

  /**
   * Delete collection document
   *
   * @public
   * @param {string} id delete document
   * @returns {Promise<void>}
   */
  public delete = async (id: string): Promise<void> => {
    await this.collection.doc(id).delete();
  };

  /**
   * List collection document
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userId] user id
   * @returns {Promise<{ data: T[]; hasFile: boolean }>} list data response
   */
  public list = async (
    limit: number = 10,
    userId?: string
  ): Promise<{ data: T[]; hasFile: boolean }> => {
    let data: T[] = [];

    let querySnapShot = this.collection.ref
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (userId) {
      querySnapShot = this.collection.ref
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .limit(limit);
    }

    const result = await querySnapShot.get();
    data = result.docs.map((doc, index) => {
      if (index === limit - 1) {
        this.lastQueryDocumentSnapshot = doc as QueryDocumentSnapshot<T>;
      }
      return doc.data();
    });

    return {
      data,
      hasFile: this.lastQueryDocumentSnapshot ? true : false,
    };
  };

  /**
   * List collection document with pagination
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userId] user id
   * @returns {Promise<void>}
   */
  public listPagination = async (
    limit: number = 10,
    userId?: string
  ): Promise<{ data: T[]; hasFile: boolean }> => {
    let data: T[] = [];
    if (!this.lastQueryDocumentSnapshot)
      return {
        data,
        hasFile: false,
      };

    let querySnapShot = this.collection.ref
      .orderBy("createdAt", "desc")
      .startAfter(this.lastQueryDocumentSnapshot)
      .limit(limit);
    if (userId) {
      querySnapShot = querySnapShot.where("userId", "==", userId);
    }
    // reset lastQuerySnapshot, otherwise hasFile will keep return true even if its already the last query
    this.lastQueryDocumentSnapshot = undefined;
    const result = await querySnapShot.get();
    data = result.docs.map((doc, index) => {
      if (index === limit - 1) {
        this.lastQueryDocumentSnapshot = doc as QueryDocumentSnapshot<T>;
      }
      return doc.data();
    });

    return {
      data,
      hasFile: this.lastQueryDocumentSnapshot ? true : false,
    };
  };

  /**
   * Generate user Id
   *
   * @public
   * @param {string} userId delete document
   * @param {string} name delete document
   * @returns {string} user id
   */
  public generateUserId(userId: string, name: string): string {
    return name.replace(/\s/g, "").toLowerCase() + "-" + userId.substring(0, 5);
  }
}
