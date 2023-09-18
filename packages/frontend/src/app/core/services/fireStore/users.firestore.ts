import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION, IUser } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
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
  };
}
