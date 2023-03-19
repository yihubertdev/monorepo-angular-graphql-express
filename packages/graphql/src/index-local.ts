import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { graphQLContext } from "./index";

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
