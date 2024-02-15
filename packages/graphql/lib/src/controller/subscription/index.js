"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const resolver_1 = require("../../decorators/resolver");
const client_1 = tslib_1.__importDefault(require("../../client"));
let SubscriptionResolver = class SubscriptionResolver {
    async sendMessage(source, args, context) {
        const { token } = args.sendMessageInput;
        const message = {
            data: {
                score: "850",
                time: "2:45",
            },
            token,
        };
        const fireMessaging = client_1.default.firebase.fireMessagingInstance;
        const result = await fireMessaging.send(message);
        console.log(result);
        return {
            result: true,
        };
    }
};
tslib_1.__decorate([
    (0, resolver_1.FieldResolver)({
        type: resolver_1.RESOLVER_TYPE.MUTATION,
    })
], SubscriptionResolver.prototype, "sendMessage", null);
SubscriptionResolver = tslib_1.__decorate([
    (0, resolver_1.Resolver)(fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8"))
], SubscriptionResolver);
exports.default = new SubscriptionResolver();
//# sourceMappingURL=index.js.map