import { ApolloServer } from "apollo-server";
import { graphQLContext } from "./index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  totalDirective,
  totalResolver,
  totalTypeDefs,
} from "./decorators/resolver";
import "./schema";
import "./scalars";

let schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

schema = totalDirective.reduce(
  (currentSchema, directive) =>
    directive.transformer(currentSchema, directive.name),
  schema
);

const server = new ApolloServer({
  schema,
  introspection: true,
  context: graphQLContext,
});

server
  .listen()
  .then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((e) => {
    console.error(e);
  });
