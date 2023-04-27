import { GraphQLSchema } from "graphql";

export abstract class BaseDirective {
  protected abstract name: string;

  public abstract transformer: (schema: GraphQLSchema) => GraphQLSchema;
}
