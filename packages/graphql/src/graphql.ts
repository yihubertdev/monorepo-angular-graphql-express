import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { IUser } from "sources";
import { ApolloServer } from "apollo-server-express";
import {logger} from "firebase-functions"

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
// async function graphQLContext({
//   event,
//   context,
//   express,
// }: {
//   event: APIGatewayProxyEvent;
//   context: Context;
//   express: {
//     req: Request;
//     res: Response;
//   };
// }): Promise<IFaceGraphqlContext> {
//   const fireStoreClient = client.firebase.firestoreInstance;
//   const token = event.headers["Authorization"] || "";
//   let userAuth: DecodedIdToken;
//   let user: FirebaseFirestore.QueryDocumentSnapshot<IUser>;
//   if (token) {
//     try {
//       userAuth = await models.firestore.users.verifyFromFirebaseAuth(token);

//       user = await models.firestore.users.get(
//         {
//           email: userAuth.email,
//         },
//         fireStoreClient
//       );
//     } catch (e) {
//       console.log(e);
//       throw new Error(`Valid authorization header is not validated`);
//     }
//   }
//   let sourceIps: string[] = [GEOLOCATION.UNKNOWN];

//   if (
//     express &&
//     express.req &&
//     express.req.headers &&
//     express.req.headers["x-forwarded-for"]
//   ) {
//     if (Array.isArray(express.req.headers["x-forwarded-for"])) {
//       sourceIps = express.req.headers["x-forwarded-for"];
//     } else {
//       sourceIps = express.req.headers["x-forwarded-for"].split(",");
//     }
//   } else if (
//     express &&
//     express.req &&
//     express.req.socket &&
//     express.req.socket.remoteAddress
//   ) {
//     sourceIps = express.req.socket.remoteAddress.split(",");
//   }
//   return {
//     remoteAddress: sourceIps[0],
//     fireStoreClient,
//   };
// }

function context({
  req,
}: {
  req: Request;
  res: Response;
}) {
  logger.log(req.headers["authorization"])
}

export const server = new ApolloServer({
  schema,
  csrfPrevention: false,
  context,
});
