"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStoreBaseModel = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const getTime_1 = tslib_1.__importDefault(require("date-fns/getTime"));
let FireStoreBaseModel = class FireStoreBaseModel {
    constructor(firestore) {
        this.firestore = firestore;
        /**
         * Retrieve all documents from collection
         *
         * @public
         * @returns {Promise<T[]>} retrieve all document
         */
        this.retrieveAll = async () => {
            const result = await (0, rxjs_1.firstValueFrom)(this.collection.valueChanges());
            return result;
        };
        /**
         * Retrieve document from collection by docs id
         *
         * @param {string} id document id
         * @public
         * @returns {Promise<any>} retrieve
         */
        this.retrieveById = async (id) => {
            const result = await (0, rxjs_1.firstValueFrom)(this.collection.doc(id).get());
            // return document;
            return result.data();
        };
        /**
         * Create document in that collection
         *
         * @public
         * @param {T} document create document
         * @returns {Promise<void>}
         */
        this.create = async (document) => {
            const id = (0, uuid_1.v4)();
            await this.collection.doc(id).set({
                ...document,
                id,
                createdAt: (0, getTime_1.default)(new Date()),
                updatedAt: (0, getTime_1.default)(new Date()),
            });
        };
        /**
         * Create document in that collection
         *
         * @public
         * @param {T} document update document
         * @returns {Promise<void>}
         */
        this.update = async (document) => {
            await this.collection.doc(document.id).update(document);
        };
        /**
         * Delete collection document
         *
         * @public
         * @param {string} id delete document
         * @returns {Promise<void>}
         */
        this.delete = async (id) => {
            await this.collection.doc(id).delete();
        };
        /**
         * List collection document
         *
         * @public
         * @param {number} [limit] = 10 limit pagination
         * @returns {Promise<void>}
         */
        this.listPagination = async (limit = 10) => {
            let data = [];
            if (this.lastQueryDocumentSnapshot) {
                const querySnapshotAfter = await this.collection.ref
                    .orderBy("createdAt", "desc")
                    .startAfter(this.lastQueryDocumentSnapshot)
                    .limit(limit)
                    .get();
                data = querySnapshotAfter.docs.map((doc) => doc.data());
                return data;
            }
            const querySnapshot = await this.collection.ref
                .orderBy("createdAt", "desc")
                .limit(limit)
                .get();
            data = querySnapshot.docs.map((doc, index, array) => {
                if (index === array.length) {
                    this.lastQueryDocumentSnapshot =
                        querySnapshot.docs[querySnapshot.docs.length - 1];
                }
                return doc.data();
            });
            return data;
        };
        this.collection = this.firestore.collection(this.collectionName());
    }
};
FireStoreBaseModel = tslib_1.__decorate([
    (0, core_1.Injectable)()
], FireStoreBaseModel);
exports.FireStoreBaseModel = FireStoreBaseModel;
//# sourceMappingURL=basic.firestore.js.map