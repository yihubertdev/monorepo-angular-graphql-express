"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationDeleteUserId = void 0;
const tslib_1 = require("tslib");
const firestore_1 = require("firebase-admin/firestore");
const client_1 = tslib_1.__importDefault(require("../../client"));
const firestore_2 = require("../../models/firestore");
/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
async function migrationDeleteUserId() {
    const fireStore = client_1.default.firebase.firestoreInstance;
    const batch = fireStore.batch();
    try {
        const users = await firestore_2.firestore.users.getAllUsers({});
        await Promise.all(users.map(async (user) => {
            const userRef = fireStore.collection("users").doc(user["userId"]);
            batch.update(userRef, {
                userId: user.displayName.replace(/\s/g, "").toLowerCase() +
                    "-" +
                    user.id.substring(0, 5),
            });
            batch.update(userRef, {
                username: firestore_1.FieldValue.delete(),
            });
            const blogs = await fireStore
                .collection("blogs")
                .where("userId", "==", user["userId"])
                .get();
            blogs.docs.map((docs) => {
                const blogRef = docs.ref;
                // Do not use batch set, it will overwrite the whole document
                batch.update(blogRef, {
                    userId: user.displayName.replace(/\s/g, "").toLowerCase() +
                        "-" +
                        user.id.substring(0, 5),
                    displayName: user["displayName"],
                });
                batch.update(userRef, {
                    username: firestore_1.FieldValue.delete(),
                });
            });
        }));
        batch.commit();
    }
    catch (e) {
        throw new Error(`Migration failed to run (${String(e)})`);
    }
}
exports.migrationDeleteUserId = migrationDeleteUserId;
migrationDeleteUserId();
//# sourceMappingURL=migrate-delete-user-id.js.map