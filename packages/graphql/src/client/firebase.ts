
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";

const firestoreInstance = getFirestore();

const fireAuthInstance = getAuth();

const fireMessagingInstance = getMessaging();

export const firebase = {
  firestoreInstance,
  fireAuthInstance,
  fireMessagingInstance,
};
