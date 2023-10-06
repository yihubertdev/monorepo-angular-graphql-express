import { Injectable } from "@angular/core";
import { Storage } from "@angular/fire/storage";
import { FireStorageBaseModel } from "./basic.bucket";

@Injectable({ providedIn: "root" })
export class FormFileStorageService extends FireStorageBaseModel {
  /**
   * Form document path
   *
   * @protected
   */
  protected path: string = "form";

  /**
   * Form document category
   *
   * @protected
   */
  protected category: string = "form";

  /**
   * Contructor
   *
   * @protected
   * @param {Storage} storage firestore storage
   */
  constructor(storage: Storage) {
    super(storage);
  }
}
