import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
} from "@angular/fire/compat/firestore";
import { firstValueFrom } from "rxjs";
import { FIRESTORE_COLLECTION } from "../../models/constants";
import { v4 as uuidv4 } from "uuid";
import getTime from "date-fns/getTime";
import { ICollectionQueryBuilder } from "types";

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
  protected lastQueryDocumentSnapshot?: any;

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
   * Create document in that collection
   *
   * @public
   * @param {T} document create document
   * @returns {Promise<void>}
   */
  public create = async (document: T): Promise<void> => {
    const id = uuidv4();
    await this.collection.doc(id).set({
      ...document,
      id,
      createdAt: getTime(new Date()),
      updatedAt: getTime(new Date()),
    });
  };

  protected buildSubCollectionQuery = (
    queries: AngularFirestoreCollection<T>,
    queryBuilder: ICollectionQueryBuilder<T>
  ): any => {
    let newQueries = queries.doc(queryBuilder.documentId);

    return queryBuilder.next
      ? this.buildSubCollectionQuery(
          newQueries.collection(queryBuilder.collectionId as string),
          queryBuilder.next
        )
      : newQueries.set(queryBuilder.documentValue as any);
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
    const query = this.buildSubCollectionQuery(this.collection, queryBuilder);

    console.log(query);
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
   * @returns {Promise<void>}
   */
  public listPagination = async (limit: number = 10): Promise<T[]> => {
    let data: T[] = [];
    if (this.lastQueryDocumentSnapshot) {
      const querySnapshotAfter = await this.collection.ref
        .orderBy("createdAt", "desc")
        .startAfter(this.lastQueryDocumentSnapshot)
        .limit(limit)
        .get();
      data = querySnapshotAfter.docs.map((doc) => doc.data());
      return data;
    }
    const querySnapshot = await this.collection.ref
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    data = querySnapshot.docs.map((doc, index, array) => {
      if (index === array.length) {
        this.lastQueryDocumentSnapshot =
          querySnapshot.docs[querySnapshot.docs.length - 1];
      }
      return doc.data();
    });

    return data;
  };
}
