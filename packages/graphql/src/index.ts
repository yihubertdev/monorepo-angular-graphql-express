import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  introspection: true,
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
