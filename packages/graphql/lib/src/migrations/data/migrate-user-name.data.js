"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationUserDisplayName = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../client"));
const firestore_1 = require("../../models/firestore");
const uuid_1 = require("uuid");
/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
async function migrationUserDisplayName() {
    const fireStore = client_1.default.firebase.firestoreInstance;
    const batch = fireStore.batch();
    const users = await firestore_1.firestore.users.get({});
    try {
        await Promise.all(users.map(async (user) => {
            const userRef = fireStore.collection("users").doc(user["userId"]);
            batch.update(userRef, {
                username: user["displayName"].replace(/\s/g, "").toLowerCase() +
                    "-" +
                    (0, uuid_1.v4)().substring(0, 5),
            });
            const blogs = await fireStore
                .collection("blogs")
                .where("userId", "==", user["userId"])
                .get();
            blogs.docs.map((docs) => {
                const blogRef = docs.ref;
                // Do not use batch set, it will overwrite the whole document
                batch.update(blogRef, {
                    username: user["displayName"].replace(/\s/g, "").toLowerCase() +
                        "-" +
                        (0, uuid_1.v4)().substring(0, 5),
                    displayName: user["displayName"],
                });
            });
        }));
        batch.commit();
    }
    catch (e) {
        throw new Error(`Migration failed to run (${String(e)})`);
    }
}
exports.migrationUserDisplayName = migrationUserDisplayName;
migrationUserDisplayName();
//# sourceMappingURL=migrate-user-name.data.js.map