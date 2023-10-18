"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    introspection: true,
});
server
    .listen()
    .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})
    .catch((e) => {
    console.error(e);
});
//# sourceMappingURL=index-local.js.map