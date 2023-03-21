import client from "../client";

/**
 * sdf
 */
async function test() {
  const fireStore = client.firebaseAdmin.getFirestoreInstance();

  const result = await fireStore.collection("users").get();

  console.log(result);
}
