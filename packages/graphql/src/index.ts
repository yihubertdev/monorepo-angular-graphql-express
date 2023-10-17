import { ApolloServer } from "apollo-server-lambda";
import models from "./models";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { Request, Response } from "express";
import { IUser } from "sources-types";
import { Knex } from "knex";
import { DecodedIdToken } from "firebase-admin/auth";
import client from "./client";

export interface IFaceGraphqlContext {
  user: FirebaseFirestore.QueryDocumentSnapshot<IUser>;
  fireStoreClient: FirebaseFirestore.Firestore;
  knexClient: Knex;
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
  const knexClient = client.knexClient.getInstance();
  const token = req.headers.authorization || null;
  if (!token) {
    throw new Error(`Valid authorization header not provided`);
  }
  let userAuth: DecodedIdToken;
  try {
    userAuth = await models.firestore.users.verifyFromFirebaseAuth(token);
  } catch (e) {
    console.log(e);
    throw new Error(`Valid authorization header is not validated`);
  }

  const user = await models.firestore.users.get(
    {
      email: userAuth.email,
    },
    fireStoreClient
  );

  return {
    user,
    fireStoreClient,
    knexClient,
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
