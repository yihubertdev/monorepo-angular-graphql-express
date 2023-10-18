"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStoreServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const firestore_1 = require("@angular/fire/firestore");
const blog_firestore_1 = require("./blog.firestore");
const users_firestore_1 = require("./users.firestore");
let FireStoreServiceModule = class FireStoreServiceModule {
};
FireStoreServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [(0, firestore_1.provideFirestore)(() => (0, firestore_1.getFirestore)())],
        providers: [users_firestore_1.UserService, blog_firestore_1.BlogService, blog_firestore_1.ArticleFireStore],
        bootstrap: [],
    })
], FireStoreServiceModule);
exports.FireStoreServiceModule = FireStoreServiceModule;
//# sourceMappingURL=firestore.module.js.map