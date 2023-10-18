"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleFireStore = exports.BlogService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const constants_1 = require("../../models/constants");
const basic_firestore_1 = require("./basic.firestore");
let BlogService = class BlogService extends basic_firestore_1.FireStoreBaseModel {
    /**
     * Collection Name.
     *
     * @protected
     * @returns {FIRESTORE_COLLECTION} collection name firestore
     */
    collectionName() {
        return constants_1.FIRESTORE_COLLECTION.blogs;
    }
    /**
     * Contructor
     *
     * @protected
     * @param {AngularFirestore} firestore firestore
     */
    constructor(firestore) {
        super(firestore);
        this.collection = this.firestore.collection(this.collectionName());
    }
};
BlogService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], BlogService);
exports.BlogService = BlogService;
let ArticleFireStore = class ArticleFireStore extends basic_firestore_1.FireStoreBaseModel {
    /**
     * Collection Name.
     *
     * @protected
     * @returns {FIRESTORE_COLLECTION} collection name firestore
     */
    collectionName() {
        return constants_1.FIRESTORE_COLLECTION.article;
    }
    /**
     * Constructor
     *
     * @protected
     * @param {AngularFirestore} firestore firestore
     */
    constructor(firestore) {
        super(firestore);
        this.collection = this.firestore.collection(this.collectionName());
    }
};
ArticleFireStore = tslib_1.__decorate([
    (0, core_1.Injectable)()
], ArticleFireStore);
exports.ArticleFireStore = ArticleFireStore;
//# sourceMappingURL=blog.firestore.js.map