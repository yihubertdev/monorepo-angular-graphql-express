import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
  Query,
} from "@angular/fire/compat/firestore";
import {
  FIRESTORE_COLLECTION,
  FIRESTORE_SUBCOLLECTION,
  IRoom,
} from "type-sources";
import { FireStoreBaseModel } from "./basic.firestore";

@Injectable({ providedIn: "root" })
export class RoomService extends FireStoreBaseModel<IRoom.IBase> {
  /**
   * Collection Name.
   * @protected
   * @returns {FIRESTORE_COLLECTION} firestore collection
   */
  protected collectionName(): FIRESTORE_COLLECTION {
    return FIRESTORE_COLLECTION.ROOM;
  }

  public serializer(
    input: Omit<IRoom.IBase, "createdAt" | "updatedAt">
  ): IRoom.IBase {
    return {
      ...input,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
  }

  /**
   * Firestore Collection
   * @protected
   */
  protected override collection: AngularFirestoreCollection<IRoom.IBase>;

  /**
   * Contructor
   * @protected
   * @param {AngularFirestore} firestore firestore
   */
  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.firestore.collection(this.collectionName());
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async createRoom({
    document,
  }: {
    document: IRoom.IBase;
  }): Promise<DocumentReference<IRoom.IBase>> {
    const collection = this.collection.doc();
    await collection.set(document);
    return collection.ref;
  }

  /**
   * Create document in that collection
   * @public
   * @param {string} roomId room id
   * @returns {Promise<IRoom.IBase[]>} retyeb
   */
  public retrieveRoom(roomId: string): DocumentReference<IRoom.IBase> {
    return this.collection.doc(roomId).ref;
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async sendOffer({
    room,
    offer,
  }: {
    room: DocumentReference<IRoom.IBase>;
    offer: IRoom.IOffer;
  }): Promise<void> {
    const subCollection = {
      collectionId: FIRESTORE_SUBCOLLECTION.OFFER,
      documentValue: offer,
    };
    await super.createSubCollection<IRoom.IOffer>(room, subCollection);
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async sendAnswer({
    room,
    answer,
  }: {
    room: DocumentReference<IRoom.IBase>;
    answer: IRoom.IOffer;
  }): Promise<void> {
    const subCollection = {
      collectionId: FIRESTORE_SUBCOLLECTION.ANSWER,
      documentValue: answer,
    };
    await super.createSubCollection<IRoom.IOffer>(room, subCollection);
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public listenOffer({
    room,
    userId,
  }: {
    room: DocumentReference<IRoom.IBase>;
    userId: string;
  }): Query<DocumentData> {
    return room
      .collection(FIRESTORE_SUBCOLLECTION.OFFER)
      .where("userId", "!=", userId);
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public listenAnswer({
    room,
    userId,
  }: {
    room: DocumentReference<IRoom.IBase>;
    userId: string;
  }): Query<DocumentData> {
    return room
      .collection(FIRESTORE_SUBCOLLECTION.ANSWER)
      .where("userId", "!=", userId);
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public listenICE({
    room,
    userId,
  }: {
    room: DocumentReference<IRoom.IBase>;
    userId: string;
  }): Query<DocumentData> {
    return room
      .collection(FIRESTORE_SUBCOLLECTION.ICE)
      .where("userId", "!=", userId);
  }

  /**
   * Create document in that collection
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async sendICE({
    room,
    ICE,
  }: {
    room: DocumentReference<IRoom.IBase>;
    ICE: IRoom.ICE;
  }): Promise<void> {
    const subCollection = {
      collectionId: FIRESTORE_SUBCOLLECTION.ICE,
      documentValue: ICE,
    };
    super.createSubCollection<IRoom.ICE>(room, subCollection);
  }

  /**
   * User join room
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async joinUser({
    room,
    userId,
  }: {
    room: DocumentReference<IRoom.IBase>;
    userId: string;
  }): Promise<void> {
    const subCollection = {
      collectionId: FIRESTORE_SUBCOLLECTION.USERS,
      documentValue: {
        userId,
        status: IRoom.IUserStatus.REQUESTED,
      },
    };
    super.createSubCollection<IRoom.IRoomUser>(room, subCollection, userId);
  }

  /**
   * User join room
   * @public
   * @param {IRoom.IBase} document create document
   * @returns {Promise<void>}
   */
  public async peeredUser({
    room,
    userId,
  }: {
    room: DocumentReference<IRoom.IBase>;
    userId: string;
  }): Promise<void> {
    const subCollection = {
      collectionId: FIRESTORE_SUBCOLLECTION.USERS,
      documentId: userId,
      documentValue: {
        userId,
        status: IRoom.IUserStatus.JOINED,
      },
    };
    super.updateSubCollection<IRoom.IRoomUser>(room, subCollection);
  }
}
