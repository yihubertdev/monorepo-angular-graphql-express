"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const resolver_1 = require("../../decorators/resolver");
const models_1 = tslib_1.__importDefault(require("../../models"));
let UserResolver = class UserResolver {
    async posts(source, args, context, info) {
        console.log(context.remoteAddress);
        if (context.remoteAddress) {
            await models_1.default.firestore.checkin.addCheckInAddress(context.remoteAddress, context.fireStoreClient);
        }
        return false;
    }
    postUser(source, args, context, info) {
        console.log(args);
        const i = 1;
        return "hello";
    }
};
tslib_1.__decorate([
    (0, resolver_1.FieldResolver)({
        type: resolver_1.RESOLVER_TYPE.QUERY,
    })
], UserResolver.prototype, "posts", null);
tslib_1.__decorate([
    (0, resolver_1.FieldResolver)({
        type: resolver_1.RESOLVER_TYPE.MUTATION,
    })
], UserResolver.prototype, "postUser", null);
UserResolver = tslib_1.__decorate([
    (0, resolver_1.Resolver)(fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8"))
], UserResolver);
exports.default = new UserResolver();
//# sourceMappingURL=index.js.map