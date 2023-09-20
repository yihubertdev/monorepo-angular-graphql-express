import { Auth, DecodedIdToken } from "firebase-admin/auth";
import client from "../client";
import {IUser } from "sources-types";

/**
 * sdf
 */
async function get(fireStoreClient?: FirebaseFirestore.Firestore): Promise<IUser[]> {
  const fireStore = fireStoreClient ?? client.firebase.firestoreInstance;
  const result = await fireStore.collection("users").get();

  return result.docs.map((dataSnapshot) => dataSnapshot.data() as IUser);
}

/**
 * Verify user firebase auth
 * @param {string} token User firebase auth token
 * @returns {Promise<DecodedIdToken>}
 */
async function verifyFromFirebaseAuth(token: string): Promise<DecodedIdToken> {
  const fireStore = client.firebase.fireAuthInstance;
  const result = await fireStore.verifyIdToken(token);

  return result;
}

export const users = {
  verifyFromFirebaseAuth,
  get,
};
