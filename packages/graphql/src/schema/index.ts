import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import { typeDefs as Hello, resolvers as helloResolver } from "./user";
import path from "path";
import fs from "fs";
import {
  typeDefs as anotherHello,
  resolvers as anotherHelloResolver,
} from "./article";
import directives from "./directives";

const SchemaTypeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

let schema = makeExecutableSchema({
  typeDefs: [SchemaTypeDefs, Hello, anotherHello],
  resolvers: merge(helloResolver, anotherHelloResolver),
});

schema = directives.reduce(
  (curSchema, directive) => directive.transformer(curSchema, directive.name),
  schema
);

export default schema;
