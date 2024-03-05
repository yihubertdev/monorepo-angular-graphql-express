import { isNil, merge } from "lodash";
import utils from ".";
import { DocumentNode, GraphQLScalarType } from "graphql";
import { gql } from "apollo-server";
import Joi from "joi";
import { RequestHandler, Router } from "express";
import joiValidator from "./routerValidator";

const baseGraphql = gql`
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
  DIRECTIVE = "DIRECTIVE",
}

type TypeMethodDecoratorResponse = (
  target: unknown,
  name: string,
  propertyDescriptor: PropertyDescriptor
) => Record<string, PropertyDescriptor>;

interface ITypeResolverParamBase {
  schema: DocumentNode;
  type: RESOLVER_TYPE;
}

interface IQueryMutationSub extends ITypeResolverParamBase {
  type:
    | RESOLVER_TYPE.QUERY
    | RESOLVER_TYPE.MUTATION
    | RESOLVER_TYPE.SUBSCRIPTION;
}

interface ISubField extends ITypeResolverParamBase {
  type: RESOLVER_TYPE.SUB_FIELD;
  subField: string;
}

// specify type and value can help ts decide which object field to choose
type ITypeResolver = IQueryMutationSub | ISubField;
export let totalResolver: Record<string, PropertyDescriptor> = {};

export const totalTypeDefs: DocumentNode[] = [baseGraphql];

/**
 * Decorator for field RESOLVER_TYPE inside resolver
 * @param {ITypeResolver}params decorator params
 * @param {RESOLVER_TYPE} params.type resolver type
 * @returns {TypeMethodDecoratorResponse} type resolver response
 */
export function TypeResolver(
  params: ITypeResolver
): TypeMethodDecoratorResponse {
  return (
    target: unknown,
    name: string, // class function name
    propertyDescriptor: PropertyDescriptor // class function content
  ) => {
    switch (params.type) {
      case RESOLVER_TYPE.QUERY:
      case RESOLVER_TYPE.MUTATION:
        totalTypeDefs.push(params.schema);

        // add object that have resolver name and function into totalResolver
        totalResolver = merge(totalResolver, {
          [params.type]: {
            [name]: propertyDescriptor.value,
          },
        });
        return totalResolver;

      case RESOLVER_TYPE.SUBSCRIPTION:
        totalTypeDefs.push(params.schema);

        totalResolver = merge(totalResolver, {
          [params.type]: {
            [name]: {
              subscribe: propertyDescriptor.value,
            },
          },
        });
        return totalResolver;

      case RESOLVER_TYPE.SUB_FIELD:
        totalTypeDefs.push(params.schema);

        totalResolver = merge(totalResolver, {
          [params.subField]: {
            [name]: propertyDescriptor.value,
          },
        });
        return totalResolver;
      default:
        throw new Error("Field Type not supported");
    }
  };
}

interface IScalar {
  description: string;
  schema: Joi.StringSchema<string>;
}

/**
 * form scalar decorator
 * @param {IScalar} params scalar descirption
 * @param {string} params.description scalar description
 * @returns {(target: object, propertyKey: string) => void} scalar return
 */
export function Scalar({
  description,
  schema,
}: IScalar): (target: object, propertyKey: string) => void {
  // target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member
  return function (target: object, propertyKey: string) {
    totalTypeDefs.unshift(gql`scalar ${propertyKey}`);
    totalResolver = merge(totalResolver, {
      [propertyKey]: new GraphQLScalarType({
        name: propertyKey,
        description,
        parseValue: (params: unknown) => {
          utils.schema.validate(schema, params);

          return params;
        },
      }),
    });
  };
}

export const enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  redirect = 301,
}

export enum API_RESPONSE_GENERIC_MESSAGE {
  SUCCESS = "SUCCESS",
  CREATED = "CREATED",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  JOI_VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export enum API_RESPONSE_SUCCESS_MESSAGE {
  SUCCESS = "Request successfully completed",
  USER_BALANCE_RESET = "User balance was reset successfully",
  DELETE_USER = "User was deleted successfully",
  INGESTION_SUCCESSFUL = "Ingestion of games and moments is completed",
}

export enum API_RESPONSE_FAILURE_MESSAGE {
  AUTHORIZATION_HEADER_REQUIRED = "Authorization header is required",
  INVALID_API_KEY_FORMAT = "Format given for api key is invalid",
  INVALID_AUTHORIZATION_HEADER_FORMAT = "Invalid authorization header format",
}

export enum API_METHOD {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export enum AUTHENTICATION_TYPE {
  BASIC = "BASIC",
}

export enum API_ROUTES {
  REST = "/rest",
  USERS = "/users",
}

interface IOptions {
  PATH: string;
  METHOD: API_METHOD;
  AUTH?: AUTHENTICATION_TYPE;
  VALIDATION?: Partial<
    Record<"query" | "params" | "body", Joi.ObjectSchema<any>>
  >;
  MIDDLEWARE?: RequestHandler[];
}

export const appRouter = Router();

/**
 * Decorator function to convert into normal express routes
 * @param {IOptions} options router options
 * @returns {unknown} description
 */
export function RoutesDecorator(options: IOptions): any {
  return (target: object, propertyKey: string): Router => {
    const requestHandlers: RequestHandler[] = [];
    if (!isNil(options.VALIDATION)) {
      requestHandlers.push(
        joiValidator.validateObjectSchema(options.VALIDATION)
      );
    }
    if (!isNil(options.MIDDLEWARE)) {
      requestHandlers.push(...options.MIDDLEWARE);
    }
    requestHandlers.push(target[propertyKey]);
    return appRouter[options.METHOD](options.PATH, requestHandlers);
  };
}
