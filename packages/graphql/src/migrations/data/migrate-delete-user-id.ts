import { FieldValue } from "firebase-admin/firestore";
import client from "../../client";
import { firestore } from "../../models/firestore";

/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
export async function migrationDeleteUserId(): Promise<void> {
  const fireStore = client.firebase.firestoreInstance;

  const batch = fireStore.batch();

  try {
    const users = await firestore.users.getAllUsers({}) as any;
    await Promise.all(
      users.map(async (user) => {
        const userRef = fireStore.collection("users").doc(user["userId"]);
        batch.update(userRef, {
          userId:
            user.displayName.replace(/\s/g, "").toLowerCase() +
            "-" +
            user.id.substring(0, 5),
        });
        batch.update(userRef, {
          username: FieldValue.delete(),
        });

        const blogs = await fireStore
          .collection("blogs")
          .where("userId", "==", user["userId"])
          .get();
        blogs.docs.map((docs) => {
          const blogRef = docs.ref;
          // Do not use batch set, it will overwrite the whole document
          batch.update(blogRef, {
            userId:
              user.displayName.replace(/\s/g, "").toLowerCase() +
              "-" +
              user.id.substring(0, 5),
            displayName: user["displayName"],
          });

          batch.update(userRef, {
            username: FieldValue.delete(),
          });
        });
      })
    );
    batch.commit();
  } catch (e) {
    throw new Error(`Migration failed to run (${String(e)})`);
  }
}

migrationDeleteUserId();
