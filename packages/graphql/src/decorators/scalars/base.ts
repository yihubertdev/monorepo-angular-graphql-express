import {
  GraphQLScalarLiteralParser,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLSchema,
} from "graphql";
import Joi from "joi";

export abstract class BaseScalar<TInternal, TExternal> {
  public abstract name: string;
  public abstract description: string;
  protected schema?: Joi.Schema;
  /** Serializes an internal value to include in a response. */
  public serialize?: GraphQLScalarSerializer<TExternal>;
  public parseValue?: GraphQLScalarValueParser<TInternal>;
  public parseLiteral?: GraphQLScalarLiteralParser<TInternal>;
}
