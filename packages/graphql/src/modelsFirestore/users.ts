import { Auth, DecodedIdToken } from "firebase-admin/auth";
import client from "../client";

/**
 * sdf
 */
async function get(fireStore: FirebaseFirestore.Firestore) {
  const result = await fireStore.collection("users").get();

  const data = result.docs.map((dataSnapshot) => dataSnapshot.data());
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
