import { ApolloServer } from "apollo-server-lambda";
import modelsFirestore from "./modelsFirestore";
import { schema } from "./schema";
import { Request, Response } from "express";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 } from "uuid";
import { DecodedIdToken } from "firebase-admin/auth";

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
  user: DecodedIdToken;
  event: APIGatewayProxyEvent;
  requestSourceIps: string[];
}> {
  const token = req.headers.authorization || "";

  const user = await modelsFirestore.users.verifyFromFirebaseAuth(token);

  const event: APIGatewayProxyEvent = {
    // fake the AWS request ID
    requestContext: { requestId: v4() },
  } as APIGatewayProxyEvent;

  return {
    token,
    user,
    event,
    requestSourceIps: [],
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
