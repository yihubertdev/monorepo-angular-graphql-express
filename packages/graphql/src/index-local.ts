import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  introspection: true,
});

server
  .listen()
  .then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((e) => {
    console.error(e);
  });
