import { ApolloServer } from "apollo-server-lambda";
import modelsFirestore from "./modelsFirestore";
import modelsKnex from "./modelsKnex";
import { schema } from "./schema";
import admin from "firebase-admin";

/**
 * sdf
 * @param
 */
export async function graphQLContext({
  req,
}: {
  req: Request;
  res: Response;
}): Promise<any> {
  // await modelsFirestore.users.get();

  await modelsKnex.users.test();
}

export const server = new ApolloServer({
  schema,
  introspection: true,
  context: graphQLContext,
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
