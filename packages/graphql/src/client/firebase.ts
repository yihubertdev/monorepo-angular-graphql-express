import admin from "firebase-admin";
import { initializeFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../../firebase-admin.json";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const firestoreInstance = initializeFirestore(firebaseApp);

const fireAuthInstance = getAuth(firebaseApp);

export const firebase = {
  firebaseApp,
  firestoreInstance,
  fireAuthInstance,
};
