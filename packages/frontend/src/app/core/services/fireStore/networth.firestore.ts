import { Injectable } from "@angular/core";
import { FireStoreBaseModel } from "./basic.firestore";
import { FIRESTORE_COLLECTION } from "sources";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { NetWorthCache } from "../cache/extend.cache";
import { firstValueFrom } from "rxjs";
import { INetWorth } from "../../static/form.static";

@Injectable({ providedIn: "root" })
export class NetWorthService extends FireStoreBaseModel<INetWorth> {
  /**
   * Collection Name.
   * @protected
   * @returns {FIRESTORE_COLLECTION} firestore collection
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.networth;
  }

  public serializer(input: INetWorth): INetWorth {
    return input;
  }

  /**
   * Firestore Collection
   * @protected
   */
  protected override collection: AngularFirestoreCollection<INetWorth>;

  private _cache: NetWorthCache;

  /**
   * Contructor
   * @protected
   * @param {AngularFirestore} firestore firestore
   * @param {NetWorthCache} cache firestore
   */
  constructor(firestore: AngularFirestore, cache: NetWorthCache) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
    this._cache = cache;
  }

  public override async create({
    document,
    id,
  }: {
    document: INetWorth;
    id: string;
  }): Promise<void> {
    await this.collection.doc(id).set(document, { merge: true });
    this._cache.delete(id);
  }

  public override async retrieveByUId(
    id: string
  ): Promise<INetWorth | undefined> {
    const cache = this._cache.get(id);
    if (cache) {
      return cache;
    }

    const result = await firstValueFrom(this.collection.doc(id).get());
    const data = result.data();
    if (!data) {
      return;
    }

    this._cache.update(data, id);
    // return document;
    return data;
  }
}
