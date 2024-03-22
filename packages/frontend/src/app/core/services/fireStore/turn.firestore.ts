import { Injectable } from "@angular/core";
import { FireStoreBaseModel } from "./basic.firestore";
import { FIRESTORE_COLLECTION, ITURNConfig } from "type-sources";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { GoogleHttpService } from "../http/google.http";

@Injectable({ providedIn: "root" })
export class TURNService extends FireStoreBaseModel<ITURNConfig> {
  /**
   * Collection Name.
   * @protected
   * @returns {FIRESTORE_COLLECTION} firestore collection
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.TURN;
  }

  public serializer(
    input: Omit<ITURNConfig, "createdAt" | "updatedAt">
  ): ITURNConfig {
    return {
      ...input,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
  }

  protected TURNService: GoogleHttpService;
  constructor(firestore: AngularFirestore, TURNService: GoogleHttpService) {
    super(firestore);
    this.TURNService = TURNService;
  }

  public override async retrieveAll(limit: number = 100) {
    let result = await super.retrieveAll(limit);

    if (result.length == 0) {
      const data = await this.TURNService.getTURNServerConfig();
      result = [
        this.serializer({
          iceServers: data,
        }),
      ];

      this.collection.doc().set(result[0]);
    }

    return result;
  }
}
