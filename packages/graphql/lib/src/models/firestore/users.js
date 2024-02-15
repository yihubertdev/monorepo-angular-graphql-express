"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../client"));
/**
 * Get user by different filter
 * @param {string} [filter.userId]
 */
async function get(filter, fireStoreClient) {
    const { userId, email } = filter;
    const fireStore = fireStoreClient ?? client_1.default.firebase.firestoreInstance;
    let query = fireStore.collection("users");
    if (userId) {
        query = query.where("userId", "==", userId);
    }
    if (email) {
        query = query.where("email", "==", email);
    }
    const [user] = (await query.get()).docs;
    return user;
}
/**
 * Get user by different filter
 * @param {string} [filter.userId]
 */
async function getPost(filter, fireStoreClient) {
    const { userId, email } = filter;
    const fireStore = fireStoreClient ?? client_1.default.firebase.firestoreInstance;
    let query = fireStore.collection("blogs");
    if (userId) {
        query = query.where("userId", "==", userId);
    }
    if (email) {
        query = query.where("email", "==", email);
    }
    const posts = (await query.get()).docs;
    return posts;
}
/**
 * Get user by different filter
 * @param {string} [filter.userId]
 */
async function getAllUsers(filter, fireStoreClient) {
    const { userId, email } = filter;
    const fireStore = fireStoreClient ?? client_1.default.firebase.firestoreInstance;
    let query = fireStore.collection("users");
    if (userId) {
        query = query.where("userId", "==", userId);
    }
    if (email) {
        query = query.where("email", "==", email);
    }
    const posts = (await query.get()).docs;
    return posts;
}
/**
 * Verify user firebase auth
 * @param {string} token User firebase auth token
 * @returns {Promise<DecodedIdToken>}
 */
async function verifyFromFirebaseAuth(token) {
    const fireStore = client_1.default.firebase.fireAuthInstance;
    const result = await fireStore.verifyIdToken(token);
    console.log(result);
    return result;
}
exports.users = {
    verifyFromFirebaseAuth,
    get,
    getPost,
    getAllUsers,
};
//# sourceMappingURL=users.js.map