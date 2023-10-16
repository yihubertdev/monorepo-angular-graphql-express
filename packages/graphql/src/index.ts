import { ApolloServer } from "apollo-server-lambda";
import modelsFirestore from "./modelsFirestore";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { totalResolver, totalTypeDefs } from "./decorators/resolver";
import "./controller";
import { Request, Response } from "express";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 } from "uuid";

const schema = makeExecutableSchema({
  typeDefs: totalTypeDefs,
  resolvers: totalResolver,
});

/**
 * sdf
 * @param
 */
export async function graphQLContext({
  req,
}: {
  req: Request;
  res: Response;
}): Promise<{
  token: string;
  event: APIGatewayProxyEvent;
  requestSourceIps: string[];
}> {
  const token = req.headers.authorization || "";
  if (token) {
    const user = await modelsFirestore.users.verifyFromFirebaseAuth(token);
  }

  const event: APIGatewayProxyEvent = {
    // fake the AWS request ID
    requestContext: { requestId: v4() },
  } as APIGatewayProxyEvent;

  return {
    token,
    event,
    requestSourceIps: [],
  };
}

export const server = new ApolloServer({
  schema,
  introspection: true,
  // context: graphQLContext,
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
