import admin from "firebase-admin";
import { initializeFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../firebase-admin.json";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const firestoreInstance = initializeFirestore(firebaseApp);

export const firebase = {
  firebaseApp,
  firestoreInstance,
};
