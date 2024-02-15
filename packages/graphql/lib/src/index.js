"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const firebase_admin_json_1 = tslib_1.__importDefault(require("../firebase-admin.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebase_admin_json_1.default),
});
const index_graphql_1 = require("./index-graphql");
const https_1 = require("firebase-functions/v1/https");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
async function startServer() {
    await index_graphql_1.server.start();
    index_graphql_1.server.applyMiddleware({
        app,
        path: "/",
        cors: true,
        bodyParserConfig: true,
    });
}
startServer();
exports.handler = (0, https_1.onRequest)(app);
//# sourceMappingURL=index.js.map