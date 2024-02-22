import { merge } from "lodash";
import utils from "../utils";
import { DocumentNode, GraphQLScalarType } from "graphql";
import { gql } from "apollo-server";
import Joi from "joi";

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
  SUB_FIELD = "SUB_FIELD",
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

export interface ITypeResolverBase {
  schema: DocumentNode;
  type: RESOLVER_TYPE;
}

export interface IQueryMutationSub extends ITypeResolverBase {
  type:
    | RESOLVER_TYPE.QUERY
    | RESOLVER_TYPE.MUTATION
    | RESOLVER_TYPE.SUBSCRIPTION;
}

export interface ISubField extends ITypeResolverBase {
  type: RESOLVER_TYPE.SUB_FIELD;
  subField: string;
}

// specify type and value can help ts decide which object field to choose
export type ITypeResolver = IQueryMutationSub | ISubField;
export let totalResolver: TypeResolver = {};

export const totalTypeDefs: DocumentNode[] = [baseGraphql];

/**
 * Decorator for field RESOLVER_TYPE inside resolver
 * @param {RESOLVER_TYPE} params.type resolver type
 * @returns {TypeMethodDecoratorResponse}
 */
export const TypeResolver = (
  params: ITypeResolver
): TypeMethodDecoratorResponse => {
  totalTypeDefs.push(params.schema);

  return (
    target: any,
    name: string, // class function name
    propertyDescriptor: PropertyDescriptor // class function content
  ) => {
    switch (params.type) {
      case RESOLVER_TYPE.QUERY:
      case RESOLVER_TYPE.MUTATION:
        // add object that have resolver name and function into totalResolver
        totalResolver = merge({
          ...totalResolver,
          [params.type]: {
            [name]: propertyDescriptor.value,
          },
        });
        return totalResolver;

      case RESOLVER_TYPE.SUBSCRIPTION:
        totalResolver = merge({
          ...totalResolver,
          [params.type]: {
            [name]: {
              subscribe: propertyDescriptor.value,
            },
          },
        });
        return totalResolver;

      case RESOLVER_TYPE.SUB_FIELD:
        totalResolver = merge({
          ...totalResolver,
          [params.subField]: {
            [name]: propertyDescriptor.value,
          },
        });
        return totalResolver;
      default:
        throw new Error(`Field Type not supported`);
    }
  };
};

export interface IScalar {
  description: string;
  schema: Joi.StringSchema<string>;
}

export function Scalar({ description, schema }: IScalar) {
  // target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member
  return function (target: Object, propertyKey: string) {
    totalTypeDefs.unshift(gql`scalar ${propertyKey}`);
    totalResolver = merge({
      ...totalResolver,
      [propertyKey]: new GraphQLScalarType({
        name: propertyKey,
        description,
        parseValue: (params: unknown) => {
          utils.schema.validate(schema, params);
        },
      }),
    });
  };
}
