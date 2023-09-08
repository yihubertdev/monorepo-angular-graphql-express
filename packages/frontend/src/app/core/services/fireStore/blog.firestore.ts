import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { FIRESTORE_COLLECTION } from "../../models/constants";
import { FireStoreBaseModel } from "./basic.firestore";
import { IArticle, IPost } from "blog";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
@Injectable()
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

@Injectable()
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
