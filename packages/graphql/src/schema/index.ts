import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import { typeDefs as Hello, resolvers as helloResolver } from "./user";
import { typeDefs as anotherHello, resolvers as anotherHelloResolver } from "./article";

const Query = `
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, Hello, anotherHello],
  resolvers: merge(helloResolver, anotherHelloResolver),
});
