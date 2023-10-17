import { Auth, DecodedIdToken } from "firebase-admin/auth";
import client from "../../client";
import { IUser } from "sources-types";

/**
 * Get user by different filter
 * @param {string} [filter.userId]
 */
async function get(
  filter: {
    userId?: string;
    email?: string;
  },
  fireStoreClient?: FirebaseFirestore.Firestore
): Promise<FirebaseFirestore.QueryDocumentSnapshot<IUser>> {
  const { userId, email } = filter;
  const fireStore = fireStoreClient ?? client.firebase.firestoreInstance;

  let query: FirebaseFirestore.Query = fireStore.collection("users");
  if (userId) {
    query = query.where("userId", "==", userId);
  }

  if (email) {
    query = query.where("email", "==", email);
  }

  const [user] = (await query.get()).docs;

  return user as FirebaseFirestore.QueryDocumentSnapshot<IUser>;
}

/**
 * Verify user firebase auth
 * @param {string} token User firebase auth token
 * @returns {Promise<DecodedIdToken>}
 */
async function verifyFromFirebaseAuth(token: string): Promise<DecodedIdToken> {
  const fireStore = client.firebase.fireAuthInstance;
  const result = await fireStore.verifyIdToken(token);
  console.log(result);
  return result;
}

export const users = {
  verifyFromFirebaseAuth,
  get,
};
