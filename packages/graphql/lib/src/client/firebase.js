"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const messaging_1 = require("firebase-admin/messaging");
const firestoreInstance = (0, firestore_1.getFirestore)();
const fireAuthInstance = (0, auth_1.getAuth)();
const fireMessagingInstance = (0, messaging_1.getMessaging)();
exports.firebase = {
    firestoreInstance,
    fireAuthInstance,
    fireMessagingInstance,
};
//# sourceMappingURL=firebase.js.map