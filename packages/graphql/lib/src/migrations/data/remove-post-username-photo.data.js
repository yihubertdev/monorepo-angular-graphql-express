"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationPostFieldRemove = void 0;
const tslib_1 = require("tslib");
const firestore_1 = require("firebase-admin/firestore");
const client_1 = tslib_1.__importDefault(require("../../client"));
const firestore_2 = require("../../models/firestore");
/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
async function migrationPostFieldRemove() {
    const fireStore = client_1.default.firebase.firestoreInstance;
    const batch = fireStore.batch();
    const posts = await firestore_2.firestore.users.getPost({});
    console.log(posts);
    try {
        posts.map((post) => {
            batch.update(post.ref, {
                displayName: firestore_1.FieldValue.delete(),
                photoURL: firestore_1.FieldValue.delete(),
                id: firestore_1.FieldValue.delete(),
            });
        });
        batch.commit();
    }
    catch (e) {
        throw new Error(`Migration failed to run (${String(e)})`);
    }
}
exports.migrationPostFieldRemove = migrationPostFieldRemove;
migrationPostFieldRemove();
//# sourceMappingURL=remove-post-username-photo.data.js.map