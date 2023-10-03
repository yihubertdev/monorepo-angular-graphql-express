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
import { subCollectionBuilderSchema } from "../../joiSchema/sub-collection.schema";
import { ICollectionQueryBuilder } from "sources-types";
@Injectable()
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

  /**
   * Contructor
   *
   * @protected
   * @param {AngularFirestore} firestore firestore
   */
  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
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

  public retrieveSubCollectionProfile = async (filter: {
    userId: string;
  }): Promise<{
    profile: IProfileHomeAddress;
    user: QueryDocumentSnapshot<IUser>;
  }> => {
    const { userId } = filter;
    let query = this.collection.ref.where("userId", "==", userId);

    const [user] = (await query.get()).docs;
    // return document;
    const subCollectionProfile = user.ref.collection("userProfile");

    const profile = await subCollectionProfile.get();

    const [document] = profile.docs.map((data) => data.data());

    return { profile: document as IProfileHomeAddress, user: user };
  };

  protected buildSubCollection(
    queries: CollectionReference<DocumentData>,
    queryBuilder: ICollectionQueryBuilder<IProfile>
  ): any {
    const { documentId, collectionId, documentValue, next } = queryBuilder;
    let newQueries = queries.doc(documentId);
    console.log(newQueries);
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
