"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const resolver_1 = require("../../decorators/resolver");
let ArticleResolver = class ArticleResolver {
    anotherhello() {
        const i = 1;
        return i;
    }
    anotherAnotherHello() {
        const i = 1;
        return "hello1";
    }
};
tslib_1.__decorate([
    (0, resolver_1.FieldResolver)({
        type: resolver_1.RESOLVER_TYPE.QUERY,
    })
], ArticleResolver.prototype, "anotherhello", null);
tslib_1.__decorate([
    (0, resolver_1.FieldResolver)({
        type: resolver_1.RESOLVER_TYPE.QUERY,
    })
], ArticleResolver.prototype, "anotherAnotherHello", null);
ArticleResolver = tslib_1.__decorate([
    (0, resolver_1.Resolver)(fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8"))
], ArticleResolver);
exports.default = new ArticleResolver();
//# sourceMappingURL=index.js.map