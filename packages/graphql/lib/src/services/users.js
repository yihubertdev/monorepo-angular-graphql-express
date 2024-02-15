"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sdf
 */
async function get(fireStore) {
    const result = await fireStore.collection("users").get();
    const data = result.docs.map((dataSnapshot) => dataSnapshot.data());
}
//# sourceMappingURL=users.js.map