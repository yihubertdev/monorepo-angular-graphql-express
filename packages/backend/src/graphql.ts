import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./utils/decorators";
import "./controller";
import { IUser } from "type-sources";
import { ApolloServer } from "apollo-server-express";

export interface IFaceGraphqlContext {
  remoteAddress?: string;
  user?: FirebaseFirestore.QueryDocumentSnapshot<IUser>;
  fireStoreClient: FirebaseFirestore.Firestore;
}

const schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

function context({ req }: { req: Request; res: Response }) {}

export const server = new ApolloServer({
  schema,
  csrfPrevention: false,
  context,
});
