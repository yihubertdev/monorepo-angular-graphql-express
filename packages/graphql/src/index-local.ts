import { ApolloServer } from "apollo-server";
import { graphQLContext } from "./index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { constraintDirective, createApolloQueryValidationPlugin } from "graphql-constraint-directive";

const schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

const plugins = [
  createApolloQueryValidationPlugin({
    schema
  })
];

const server = new ApolloServer({
  schema,
  introspection: true,
  context: graphQLContext,
  plugins
});

server
  .listen()
  .then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((e) => {
    console.error(e);
  });
