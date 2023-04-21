import { merge } from "lodash";
import fs from "fs";
import path from "path";
import Joi from "joi";
import directives from "../directives";
import { IFaceDirective } from "../directives/validation";
import { GraphQLScalarType } from "graphql";

export interface IFaceResolverPropertyDescriptor extends PropertyDescriptor {
  configurable: boolean;
  enumerable: boolean;
  get(): () => Record<string, IFaceResolverPropertyDescriptor>;
}
export type TypeResolver = Record<string, IFaceResolverPropertyDescriptor>;

export let totalResolver = {};
export const totalDirective: IFaceDirective[] = [];
export const totalTypeDefs: string[] = [
  fs.readFileSync(path.join(__dirname, "../schema/schema.graphql"), "utf8"),
];
export const FieldResolver = (params: {
  type: string;
  validation?: Joi.ObjectSchema;
  scalar?: string;
  description?: string;
}) => {
  const { type, validation, scalar, description } = params;

  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    if (validation) {
      const directive = directives.validation.inputObject({
        name: memberName,
        validation,
      });

      totalTypeDefs.unshift(directive.typeDefs);
      totalDirective.push(directive);
    }

    if (scalar) {
      totalTypeDefs.unshift(scalar);

      return (totalResolver = merge(
        totalResolver,
        Object.defineProperty({}, memberName, {
          configurable: true,
          enumerable: true,
          value: new GraphQLScalarType({
            name: memberName,
            description,
            ...propertyDescriptor.value,
          }),
        }) as TypeResolver
      ));
    }

    return (totalResolver = merge(
      totalResolver,
      Object.defineProperty({}, type, {
        configurable: true,
        enumerable: true,
        get: () =>
          Object.defineProperty({}, memberName, {
            configurable: true,
            enumerable: true,
            value: propertyDescriptor.value,
          }),
      }) as TypeResolver
    ));
  };
};

export const Resolver = (typeDefs: string) => {
  return (target: Function) => {
    totalTypeDefs.push(typeDefs);
  };
};
