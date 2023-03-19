import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import { typeDefs as Hello, resolvers as helloResolver } from "./user";
import path from "path";
import fs from "fs";
import {
  typeDefs as anotherHello,
  resolvers as anotherHelloResolver,
} from "./article";

export const SchemaTypeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

export const schema = makeExecutableSchema({
  typeDefs: [SchemaTypeDefs, Hello, anotherHello],
  resolvers: merge(helloResolver, anotherHelloResolver),
});
