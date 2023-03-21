import client from "../client";

/**
 * sdf
 */
async function get() {
  const fireStore = client.firebaseAdmin.getFirestoreInstance();
  const result = await fireStore.collection("users").get();
}

export const users = {
  get,
};
