import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION } from "sources-types";
import { FireStoreBaseModel } from "./basic.firestore";
import { IArticle, IPost } from "sources-types";

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
