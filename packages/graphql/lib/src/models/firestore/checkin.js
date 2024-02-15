"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkin = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../client"));
/**
 * Add user checkin address
 * @param {string} ip user remote address
 * @param {string} [fireStoreClient] firestore client
 * @returns {void}
 */
async function addCheckInAddress(ip, fireStoreClient) {
    const fireStore = fireStoreClient ?? client_1.default.firebase.firestoreInstance;
    await fireStore.collection("checkin").doc(ip).set({
        createdAt: new Date().getTime(),
    });
}
exports.checkin = {
    addCheckInAddress,
};
//# sourceMappingURL=checkin.js.map