"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const constants_1 = require("../../models/constants");
const basic_firestore_1 = require("./basic.firestore");
let UserService = class UserService extends basic_firestore_1.FireStoreBaseModel {
    /**
     * Collection Name.
     *
     * @protected
     * @returns {FIRESTORE_COLLECTION} firestore collection
     */
    collectionName() {
        return constants_1.FIRESTORE_COLLECTION.users;
    }
    /**
     * Contructor
     *
     * @protected
     * @param {AngularFirestore} firestore firestore
     */
    constructor(firestore) {
        super(firestore);
        /**
         * Retrieve user with verfied email
         *
         * @public
         * @param {boolean} verified verified email
         * @returns {Promise<IUser[]>} user
         */
        this.getUserWithVerifiedEmail = async (verified) => {
            const result = await this.collection.ref
                .where("emailVerified", "==", verified)
                .get();
            const data = result.docs.map((item) => item.data());
            return data;
        };
        this.create = async (document) => {
            await this.collection.doc(document.id).set(document);
        };
        this.collection = this.firestore.collection(this.collectionName());
    }
};
UserService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.firestore.js.map