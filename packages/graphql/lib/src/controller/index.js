"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("./user"));
const article_1 = tslib_1.__importDefault(require("./article"));
const subscription_1 = tslib_1.__importDefault(require("./subscription"));
exports.default = {
    UserResolver: user_1.default,
    ArticleResolver: article_1.default,
    NotificationResolver: subscription_1.default,
};
//# sourceMappingURL=index.js.map