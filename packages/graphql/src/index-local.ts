import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

(async () => {
  const typeDefs = `
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => "world",
    },
  };
  console.log("hello");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
