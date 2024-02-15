"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../client"));
module.exports = () => {
    const configuration = client_1.default.knexClient.generateKnexConfiguration();
    return {
        development: {
            ...configuration,
            migrations: {
                extension: "ts",
                directory: "./migrations",
                stub: "./migrations/stub.ts",
            },
        },
    };
};
//# sourceMappingURL=knexfile.js.map