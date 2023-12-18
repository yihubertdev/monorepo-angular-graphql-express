import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, SUBCOLLECTION_HANDLER } from "sources-types";
import { v4 as uuidv4 } from "uuid";
import { ICollectionQueryBuilder, POST } from "sources-types";
import joiValidator from "../../utils/validator";
import {
  deleteCollectionBuilderSchema,
  subCollectionBuilderSchema,
  subCollectionHandlerSchema,
} from "../../joiSchema/sub-collection.schema";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

export type ISubCollectionHandler<K> = {
  queries: DocumentReference<K>;
  action: SUBCOLLECTION_HANDLER;
  value?: K;
};

@Injectable({ providedIn: "root" })
export abstract class FireStoreBaseModel<T> {
  /**
   * Collection Name.
   *
   * @protected
   */
  protected abstract collectionName(): FIRESTORE_COLLECTION;

  public abstract serializer(
    input: Omit<T, "id" | "createdAt" | "updatedAt">
  ): T;

  /**
   * Firestore Collection
   *
   * @protected
   */
  protected collection: AngularFirestoreCollection<T>;

  //Save last document in query document snapshot received. Type set to any first, since firestore.QueryDocumentSnapshot<T> not exported in compat version
  protected lastQueryDocumentSnapshot?: QueryDocumentSnapshot<T>;

  constructor(protected firestore: AngularFirestore) {
    this.collection = firestore.collection(this.collectionName());
  }

  /**
   * Retrieve all documents from collection
   *
   * @public
   * @param {number} limit limit the record
   * @returns {Promise<T[]>} retrieve all document
   */
  public retrieveAll = async (limit: number = 100): Promise<T[]> => {
    const result = await this.collection.ref.limit(limit).get();

    return result.docs.map((data) => data.data());
  };

  /**
   * Retrieve document from collection by docs id
   *
   * @param {string[]} ids document id
   * @public
   * @returns {Promise<any>} retrieve
   */
  public retrieveById = async (ids: string[]): Promise<T[]> => {
    const result = await this.collection.ref.where("userId", "in", ids).get();
    // return document;
    return result.docs.map((data) => data.data()) as T[];
  };

  /**
   * Retrieve document from collection by docs id
   *
   * @param {string} id document id
   * @public
   * @returns {Promise<any>} retrieve
   */
  public async retrieveByUId(id: string): Promise<T | undefined> {
    const result = await firstValueFrom(this.collection.doc(id).get());
    // return document;
    return result.data();
  }

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
  public async create({
    document,
    id = uuidv4(),
  }: {
    document: T;
    id?: string;
  }): Promise<void> {
    await this.collection.doc(id).set({
      ...document,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });
  }

  /**
   * Create document in that collection
   *
   * @public
   * @param {T} document update document
   * @returns {void}
   */
  public update({
    document,
    uid,
  }: {
    document: Partial<T>;
    uid: string;
  }): void {
    this.collection.doc(uid).update(document);
  }

  public async updateByUserId({
    document,
    userId,
  }: {
    document: Partial<T>;
    userId: string;
  }): Promise<void> {
    const collectionRef = await this.collection.ref
      .where("userId", "==", userId)
      .get();

    collectionRef.docs.forEach((doc) => doc.ref.update(document));
  }

  /**
   * Delete collection document
   *
   * @public
   * @param {string} id delete document
   * @returns {void}
   */
  public async delete(id: string): Promise<void> {
    this.collection.doc(id).ref.delete();
  }

  /**
   * List collection document
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userIds] user id
   * @returns {Promise<{ data: T[]; hasFile: boolean }>} list data response
   */
  public async list(
    limit: number = 10,
    userIds?: string[]
  ): Promise<{ data: T[]; hasFile: boolean }> {
    let data: T[] = [];

    let querySnapShot = this.collection.ref
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (userIds) {
      querySnapShot = querySnapShot.where("userId", "in", userIds);
    }
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
  }

  /**
   * List collection document
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userIds] user id
   * @returns {Promise<{ data: T[]; hasFile: boolean }>} list data response
   */
  public async listPostContainImage(
    limit: number = 10,
    userIds?: string[]
  ): Promise<{ data: T[]; hasFile: boolean }> {
    let data: T[] = [];

    let querySnapShot = this.collection.ref
      .where("type", "in", [POST.POST_TYPE.IMAGE, POST.POST_TYPE.PREVIEW])
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (userIds) {
      querySnapShot = querySnapShot.where("userId", "in", userIds);
    }
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
  }

  /**
   * List collection document with pagination
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userIds] user id
   * @returns {Promise<void>}
   */
  public listImagePagination = async (
    limit: number = 10,
    userIds?: string[]
  ): Promise<{ data: T[]; hasFile: boolean }> => {
    let data: T[] = [];
    if (!this.lastQueryDocumentSnapshot)
      return {
        data,
        hasFile: false,
      };

    let querySnapShot = this.collection.ref
      .where("type", "in", [POST.POST_TYPE.IMAGE, POST.POST_TYPE.PREVIEW])
      .orderBy("createdAt", "desc")
      .startAfter(this.lastQueryDocumentSnapshot)
      .limit(limit);
    if (userIds) {
      querySnapShot = querySnapShot.where("userId", "in", userIds);
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
   * List collection document with pagination
   *
   * @public
   * @param {number} [limit] = 10 limit pagination
   * @param {string} [userIds] user id
   * @returns {Promise<void>}
   */
  public listPagination = async (
    limit: number = 10,
    userIds?: string[]
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
    if (userIds) {
      querySnapShot = querySnapShot.where("userId", "in", userIds);
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

  private buildSubCollectionHandler<K extends DocumentData>(
    queries: CollectionReference<K>,
    queryBuilder: ICollectionQueryBuilder<K>,
    handler: SUBCOLLECTION_HANDLER
  ): Promise<void | DocumentData> {
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);

    return next
      ? this.buildSubCollectionHandler(
          newQueries.collection(collectionId as string),
          next,
          handler
        )
      : this.subCollectionHandler({
          queries: newQueries,
          action: handler,
          value: documentValue,
        });
  }

  private async subCollectionHandler<K extends DocumentData>(
    filter: ISubCollectionHandler<K>
  ): Promise<void | K> {
    joiValidator.parameter({
      data: filter,
      schema: subCollectionHandlerSchema,
    });
    const { queries, action, value } = filter;
    switch (action) {
      case SUBCOLLECTION_HANDLER.CREATE:
        queries.set(value!);
        break;
      case SUBCOLLECTION_HANDLER.READ:
        return (await queries.get()).data();
      case SUBCOLLECTION_HANDLER.UPDATE:
        queries.update(value!);
        break;
      case SUBCOLLECTION_HANDLER.DELETE:
        queries.delete();
        break;
    }
  }

  public updateSubCollectionByUser<K extends DocumentData>(
    user: QueryDocumentSnapshot<T>,
    queryBuilder: ICollectionQueryBuilder<K>
  ): void {
    joiValidator.parameter({
      data: queryBuilder,
      schema: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    next
      ? this.buildSubCollectionHandler(
          collection,
          next,
          SUBCOLLECTION_HANDLER.UPDATE
        )
      : this.subCollectionHandler({
          queries: collection.doc(documentId),
          action: SUBCOLLECTION_HANDLER.UPDATE,
        });
  }

  public readSubCollectionByUser<K extends DocumentData>(
    user: QueryDocumentSnapshot<T>,
    queryBuilder: ICollectionQueryBuilder<K>
  ): Promise<DocumentData | void> {
    joiValidator.parameter({
      data: queryBuilder,
      schema: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    return next
      ? this.buildSubCollectionHandler(
          collection,
          next,
          SUBCOLLECTION_HANDLER.READ
        )
      : this.subCollectionHandler({
          queries: collection.doc(documentId),
          action: SUBCOLLECTION_HANDLER.READ,
        });
  }

  public createSubCollectionByUser<K extends DocumentData>(
    user: QueryDocumentSnapshot<T>,
    queryBuilder: ICollectionQueryBuilder<K>
  ): Promise<DocumentData | void> {
    joiValidator.parameter({
      data: queryBuilder,
      schema: subCollectionBuilderSchema,
    });
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    return next
      ? this.buildSubCollectionHandler(
          collection,
          next,
          SUBCOLLECTION_HANDLER.CREATE
        )
      : this.subCollectionHandler({
          queries: collection.doc(documentId),
          action: SUBCOLLECTION_HANDLER.CREATE,
          value: documentValue,
        });
  }

  public deleteSubCollectionDocumentByUser<K extends DocumentData>(
    user: QueryDocumentSnapshot<T>,
    queryBuilder: ICollectionQueryBuilder<K>
  ): void {
    joiValidator.parameter({
      data: queryBuilder,
      schema: deleteCollectionBuilderSchema,
    });
    const { documentId, collectionId, next } = queryBuilder;
    const collection = user.ref.collection(collectionId!);

    next
      ? this.buildSubCollectionHandler(
          collection,
          next,
          SUBCOLLECTION_HANDLER.DELETE
        )
      : this.subCollectionHandler({
          queries: collection.doc(documentId),
          action: SUBCOLLECTION_HANDLER.DELETE,
        });
  }
}
