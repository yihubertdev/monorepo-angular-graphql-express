import { Knex } from "knex";

/**
 * sdf
 */
async function get(fireStore: FirebaseFirestore.Firestore) {
  const result = await fireStore.collection("users").get();

  const data = result.docs.map((dataSnapshot) => dataSnapshot.data());
}
