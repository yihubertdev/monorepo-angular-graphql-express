import client from "../../client";
import modelsFirestore from "../../models/firestore";
import { v4 as uuidv4 } from "uuid";

/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
export async function migrationUserDisplayName(): Promise<void> {
  const fireStore = client.firebase.firestoreInstance;

  const batch = fireStore.batch();

  const users = await modelsFirestore.users.get();

  try {
    await Promise.all(
      users.map(async (user) => {
        const userRef = fireStore.collection("users").doc(user["userId"]);
        batch.update(userRef, {
          username:
            user["displayName"].replace(/\s/g, "").toLowerCase() +
            "-" +
            uuidv4().substring(0, 5),
        });

        const blogs = await fireStore
          .collection("blogs")
          .where("userId", "==", user["userId"])
          .get();
        blogs.docs.map((docs) => {
          const blogRef = docs.ref;
          // Do not use batch set, it will overwrite the whole document
          batch.update(blogRef, {
            username:
              user["displayName"].replace(/\s/g, "").toLowerCase() +
              "-" +
              uuidv4().substring(0, 5),
            displayName: user["displayName"],
          });
        });
      })
    );
    batch.commit();
  } catch (e) {
    throw new Error(`Migration failed to run (${String(e)})`);
  }
}

migrationUserDisplayName();
