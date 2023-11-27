import { FieldValue } from "firebase-admin/firestore";
import client from "../../client";
import { firestore as modelsFirestore } from "../../models/firestore";

/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
export async function migrationPostFieldRemove(): Promise<void> {
  const fireStore = client.firebase.firestoreInstance;

  const batch = fireStore.batch();

  const posts = await modelsFirestore.users.getPost({});
  console.log(posts);
  try {
    posts.map((post) => {
      batch.update(post.ref, {
        displayName: FieldValue.delete(),
        photoURL: FieldValue.delete(),
        id: FieldValue.delete(),
      });
    });

    batch.commit();
  } catch (e) {
    throw new Error(`Migration failed to run (${String(e)})`);
  }
}

migrationPostFieldRemove();
