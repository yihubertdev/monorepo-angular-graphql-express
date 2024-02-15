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

  const users = (await modelsFirestore.users.getAllUsers({})) as any;
  try {
    users.map((user) => {
      batch.update(user.ref, {
        email: FieldValue.delete(),
        emailVerified: FieldValue.delete(),
        isAnonymous: FieldValue.delete(),
        phoneNumber: FieldValue.delete(),
      });
    });

    batch.commit();
  } catch (e) {
    throw new Error(`Migration failed to run (${String(e)})`);
  }
}

migrationPostFieldRemove();
