"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const apollo_server_lambda_1 = require("apollo-server-lambda");
const schema_1 = require("./schema");
const server = new apollo_server_lambda_1.ApolloServer({
    schema: schema_1.schema,
    introspection: true,
});
exports.handler = server.createHandler({
    expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
//# sourceMappingURL=index.js.map