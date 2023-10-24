import client from "../../client";

/**
 * Add user checkin address
 * @param {string} ip user remote address
 * @param {string} [fireStoreClient] firestore client
 * @returns {void}
 */
async function addCheckInAddress(
  ip: string,
  fireStoreClient?: FirebaseFirestore.Firestore
): Promise<void> {
  const fireStore = fireStoreClient ?? client.firebase.firestoreInstance;
  await fireStore.collection("checkin").doc(ip).set({
    createdAt: new Date().getTime(),
  });
}

export const checkin = {
  addCheckInAddress,
};
