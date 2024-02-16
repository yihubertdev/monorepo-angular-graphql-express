import { merge } from "lodash";
import utils from "../utils";
import scalars from "./scalars";
import { DocumentNode } from "graphql";
import { gql } from "apollo-server";

export const baseGraphql = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;
export const enum RESOLVER_TYPE {
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

export const totalResolver: TypeResolver = {};

export const totalTypeDefs: DocumentNode[] = [baseGraphql];

// Change the reference value directly, no need to return. variable is a reference to an object or arrays in ts
utils.graphql.addScalars(totalResolver, totalTypeDefs, scalars);

/**
 * Decorator for field RESOLVER_TYPE inside resolver
 * @param {RESOLVER_TYPE} params.type resolver type
 * @returns {TypeMethodDecoratorResponse}
 */
export const FieldResolver = ({
  type,
  description,
  schema,
  subQuery,
}: {
  schema: DocumentNode;
  type: RESOLVER_TYPE;
  description?: string;
  subQuery?: string;
}): TypeMethodDecoratorResponse => {
  totalTypeDefs.push(schema);
  return (
    target: any,
    name: string, // class function name
    propertyDescriptor: PropertyDescriptor // class function content
  ) => {
    switch (type) {
      case RESOLVER_TYPE.QUERY:
      case RESOLVER_TYPE.MUTATION:
        // add object that have resolver name and function into totalResolver
        merge(
          totalResolver,
          Object.defineProperty({}, type, {
            configurable: true,
            enumerable: true,
            value: Object.defineProperty({}, name, {
              configurable: true,
              enumerable: true,
              value: propertyDescriptor.value,
            }),
          })
        );
        return totalResolver;

      case RESOLVER_TYPE.SUBSCRIPTION:
        merge(
          totalResolver,
          Object.defineProperty({}, type, {
            configurable: true,
            enumerable: true,
            value: Object.defineProperty({}, name, {
              configurable: true,
              enumerable: true,
              value: {
                resolve: (rootValue: any): any => rootValue,
                subscribe: propertyDescriptor.value,
              },
            }),
          })
        );
        return totalResolver;

      case RESOLVER_TYPE.SUB_QUERY:
        if (!subQuery) {
          throw Error("subQuery not provided");
        }
        merge(
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
        );
        return totalResolver;

      default:
        throw new Error(`Field Type ${type} not supported`);
    }
  };
};
