import { merge } from "lodash";
import fs from "fs";
import path from "path";
import { IFaceDirective } from "../directives/validation";
import { GraphQLScalarType } from "graphql";

export enum RESOLVER_TYPE {
  QUERY = "Query",
  MUTATION = "Mutation",
  SUBSCRIPTION = "Subscription",
  SCALAR = "Scalar",
  SUB_QUERY = "SUB_QUERY",
}
export interface IFaceResolverPropertyDescriptor extends PropertyDescriptor {
  configurable: boolean;
  enumerable: boolean;
  get?: () => Record<string, Function>;
  value?: any;
}

export type TypeResolver = Record<string, IFaceResolverPropertyDescriptor>;

export type TypeMethodDecoratorResponse = (
  target: any,
  name: string,
  propertyDescriptor: PropertyDescriptor
) => TypeResolver;

export let totalResolver = {};
export const totalDirective: IFaceDirective[] = [];
export const totalTypeDefs: string[] = [
  fs.readFileSync(path.join(__dirname, "../schema/schema.graphql"), "utf8"),
];

/**
 * Decorator for field RESOLVER_TYPE inside resolver
 * @param {RESOLVER_TYPE} params.type resolver type
 * @returns {TypeMethodDecoratorResponse}
 */
export function FieldResolver(params: {
  type: RESOLVER_TYPE;
  description?: string;
  subQuery?: string;
}): TypeMethodDecoratorResponse {
  const { type, description, subQuery } = params;

  return (
    target: any,
    name: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    switch (type) {
      case RESOLVER_TYPE.QUERY:
      case RESOLVER_TYPE.MUTATION:
      case RESOLVER_TYPE.SUBSCRIPTION:
        return (totalResolver = merge(
          totalResolver,
          Object.defineProperty({}, type, {
            configurable: true,
            enumerable: true,
            value: Object.defineProperty({}, name, {
              configurable: true,
              enumerable: true,
              value: propertyDescriptor.value,
            }),
          }) as TypeResolver
        ));

      case RESOLVER_TYPE.SCALAR:
        // Manually add scalar does not work on schema graphql, comment it first
        // totalTypeDefs.unshift(`scalar ${name}`);
        totalResolver = merge(
          totalResolver,
          Object.defineProperty({}, name, {
            configurable: true,
            enumerable: true,
            value: new GraphQLScalarType({
              name,
              description,
              ...propertyDescriptor.value(),
            }),
          }) as TypeResolver
        );
        return totalResolver;

      case RESOLVER_TYPE.SUB_QUERY:
        if (!subQuery) {
          throw Error("subQuery not provided");
        }
        return (totalResolver = merge(
          totalResolver,
          Object.defineProperty({}, subQuery, {
            configurable: true,
            enumerable: true,
            value: Object.defineProperty({}, name, {
              configurable: true,
              enumerable: true,
              value: propertyDescriptor.value,
            }),
          }) as TypeResolver
        ));

      default:
        throw new Error(`Field Type ${type} not supported`);
    }
  };
}

export const Resolver = (typeDefs: string) => {
  return (target: Function) => {
    totalTypeDefs.push(typeDefs);
  };
};
