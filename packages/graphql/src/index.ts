import { ApolloServer } from "apollo-server-lambda";
import models from "./models";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { Request, Response } from "express";
import { IUser } from "sources-types";
import { DecodedIdToken } from "firebase-admin/auth";
import client from "./client";

export interface IFaceGraphqlContext {
  remoteAddress?: string;
  user?: FirebaseFirestore.QueryDocumentSnapshot<IUser>;
  fireStoreClient: FirebaseFirestore.Firestore;
}

const schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

/**
 * Get graphql context
 * @param
 */
export async function graphQLContext({
  req,
}: {
  req: Request;
  res: Response;
}): Promise<IFaceGraphqlContext> {
  const fireStoreClient = client.firebase.firestoreInstance;
  const token = req.headers.authorization || null;
  let userAuth: DecodedIdToken;
  let user: FirebaseFirestore.QueryDocumentSnapshot<IUser>;
  if (token) {
    try {
      userAuth = await models.firestore.users.verifyFromFirebaseAuth(token);

      user = await models.firestore.users.get(
        {
          email: userAuth.email,
        },
        fireStoreClient
      );
    } catch (e) {
      console.log(e);
      throw new Error(`Valid authorization header is not validated`);
    }
  }

  return {
    remoteAddress: req.socket.remoteAddress,
    fireStoreClient,
  };
}

export const server = new ApolloServer({
  schema,
  introspection: true,
  context: graphQLContext,
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
