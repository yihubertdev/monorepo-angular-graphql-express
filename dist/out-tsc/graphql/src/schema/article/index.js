"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
exports.typeDefs = fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8");
exports.resolvers = {
    Query: {
        anotherhello: () => "world",
        anotherAnotherHello: () => "anotherAnotherHello",
    },
};
//# sourceMappingURL=index.js.map