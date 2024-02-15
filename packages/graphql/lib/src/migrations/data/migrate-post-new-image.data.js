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
    const posts = (await firestore_2.firestore.users.getPost({}));
    try {
        posts.map((post) => {
            batch.update(post.ref, {
                photoURL: firestore_1.FieldValue.delete(),
                displayName: firestore_1.FieldValue.delete(),
            });
            if (post.data().image === "" || Array.isArray(post.data().image)) {
                if (post.data().image.length === 0) {
                    batch.update(post.ref, {
                        image: firestore_1.FieldValue.delete(),
                    });
                }
            }
            if (post.data().description && !Array.isArray(post.data().image)) {
                batch.update(post.ref, {
                    image: [post.data().image],
                });
            }
            if (post.data().image && !post.data().description) {
                batch.update(post.ref, {
                    type: "IMAGE",
                    video: firestore_1.FieldValue.delete(),
                });
            }
            if (post.data().video) {
                batch.update(post.ref, {
                    type: "VIDEO",
                });
            }
            if (post.data().description) {
                batch.update(post.ref, {
                    type: "PREVIEW",
                });
            }
            if (!post.data().video && !post.data().image) {
                batch.update(post.ref, {
                    type: "TEXT",
                });
            }
            if (post.data().preview) {
                batch.update(post.ref, {
                    type: "PREVIEW",
                    image: post.data().preview.image,
                    description: post.data().preview.description,
                    title: post.data().preview.title,
                    url: post.data().preview.url,
                    preview: firestore_1.FieldValue.delete(),
                });
            }
        });
        batch.commit();
    }
    catch (e) {
        throw new Error(`Migration failed to run (${String(e)})`);
    }
}
exports.migrationPostFieldRemove = migrationPostFieldRemove;
migrationPostFieldRemove();
//# sourceMappingURL=migrate-post-new-image.data.js.map