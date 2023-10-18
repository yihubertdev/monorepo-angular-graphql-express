"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const lodash_1 = require("lodash");
const user_1 = require("./user");
const article_1 = require("./article");
const Query = `
  type Query {
    _empty: String
  }
`;
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [Query, user_1.typeDefs, article_1.typeDefs],
    resolvers: (0, lodash_1.merge)(user_1.resolvers, article_1.resolvers),
});
//# sourceMappingURL=index.js.map