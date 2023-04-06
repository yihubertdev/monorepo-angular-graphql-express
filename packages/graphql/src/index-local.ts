import { ApolloServer } from "apollo-server";
import { graphQLContext } from "./index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import directives from "./directives";
import { totalResolver, totalTypeDefs } from "./decorators/graphql";
import "./schema";

let schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

schema = directives.reduce(
  (curSchema, directive) => directive.transformer(curSchema, directive.name),
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
