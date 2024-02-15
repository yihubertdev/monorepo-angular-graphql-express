"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const schema_1 = require("@graphql-tools/schema");
const resolver_1 = require("./decorators/resolver");
require("./controller");
const apollo_server_express_1 = require("apollo-server-express");
const firebase_functions_1 = require("firebase-functions");
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: resolver_1.totalTypeDefs,
    resolvers: resolver_1.totalResolver,
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
function context({ req, }) {
    firebase_functions_1.logger.log(req.headers["authorization"]);
}
exports.server = new apollo_server_express_1.ApolloServer({
    schema,
    csrfPrevention: false,
    context
});
//# sourceMappingURL=index-graphql.js.map