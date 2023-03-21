import client from "../client";

/**
 * sdf
 */
async function get() {
  const fireStore = client.firebase.firestoreInstance;
  const result = await fireStore.collection("users").get();

  const data = result.docs.map((dataSnapshot) => dataSnapshot.data());

  // console.log(data);
}

export const users = {
  get,
};
