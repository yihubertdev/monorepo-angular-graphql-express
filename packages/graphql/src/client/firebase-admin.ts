import admin, { app, AppOptions } from "firebase-admin";
import { initializeFirestore } from "firebase-admin/firestore";

/**
 * Create a Firebase admin instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getInstance(options?: AppOptions): app.App {
  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert("../../firebase-admin.json"),
    ...options,
  });

  return firebaseAdmin;
}

/**
 * Create a Firestore instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getFirestoreInstance(options?: AppOptions): admin.firestore.Firestore {
  const app = firebaseAdmin.getInstance();

  const fireStoreInstance = initializeFirestore(app);

  return fireStoreInstance;
}

export const firebaseAdmin = {
  getInstance,
  getFirestoreInstance,
};
