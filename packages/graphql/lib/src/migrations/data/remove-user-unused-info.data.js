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
    const users = (await firestore_2.firestore.users.getAllUsers({}));
    try {
        users.map((user) => {
            batch.update(user.ref, {
                email: firestore_1.FieldValue.delete(),
                emailVerified: firestore_1.FieldValue.delete(),
                isAnonymous: firestore_1.FieldValue.delete(),
                phoneNumber: firestore_1.FieldValue.delete(),
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
//# sourceMappingURL=remove-user-unused-info.data.js.map