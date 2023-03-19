import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./schema";

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
  console.log(req.headers);
}

export const server = new ApolloServer({
  schema,
  introspection: true,
  context: graphQLContext,
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: { bodyParserConfig: { limit: "500mb" } },
});
