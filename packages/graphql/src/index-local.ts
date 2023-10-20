import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { IFaceGraphqlContext } from "src";
import { DecodedIdToken } from "firebase-admin/auth";
import client from "./client";
import { GEOLOCATION, IUser } from "sources-types";
import models from "./models";
import { Request, Response } from "express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

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
    remoteAddress: req.socket.remoteAddress ?? "",
    fireStoreClient,
  };
}

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
