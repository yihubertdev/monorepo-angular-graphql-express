import { merge } from "lodash";
import { TypeResolver } from "../decorators/resolver";
import { GraphQLScalarType } from "graphql";

/**
 * Validates an arbitrary object against a Joi schema
 *
 * @param {Joi.ObjectSchema<any>} schema
 * @param {object} params
 * @returns {T | unknown}
 * @throws {OnmoValidationError} - If the validation failed
 */
export function addScalars(
  resolvers: TypeResolver,
  typeDefs: string[],
  scalars: Record<string, any>
): void {
  Object.keys(scalars).forEach((key) => {
    const { name, description, parseLiteral, parseValue, serialize } =
      scalars[key];
    typeDefs.unshift(`scalar ${name}`);

    merge(
      resolvers,
      Object.defineProperty({}, name, {
        configurable: true,
        enumerable: true,
        value: new GraphQLScalarType({
          name,
          description,
          serialize,
          parseValue,
          parseLiteral,
        }),
      }) as TypeResolver
    );
  });
}
