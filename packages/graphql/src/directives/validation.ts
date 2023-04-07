import { GraphQLInputObjectType, GraphQLSchema } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import Joi from "joi";

const INPUT_OBJECT = "Validation";
export interface IFaceDirective {
  name: string;
  typeDefs: string;
  transformer: (schema: GraphQLSchema, directiveName: string) => GraphQLSchema;
}

type TypeDirectiveBuilder = (params: {
  name: string;
  validation: Joi.ObjectSchema;
}) => IFaceDirective;

const inputObject: TypeDirectiveBuilder = (params: {
  name: string;
  validation: Joi.ObjectSchema;
}) => {
  const { name, validation } = params;
  const directiveName = name + INPUT_OBJECT;
  return {
    name: directiveName,
    typeDefs: `directive @${directiveName} on INPUT_OBJECT`,
    transformer: (schema: GraphQLSchema, directiveName: string) => {
      return mapSchema(schema, {
        // Executes once for each object field in the schema
        [MapperKind.INPUT_OBJECT_TYPE]: (fieldConfig) => {
          // Check whether this field has the specified directive
          const directive = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];

          if (directive) {
            console.log(fieldConfig);
            return fieldConfig;
          }
          return fieldConfig;
        },
      });
    },
  } as IFaceDirective;
};

export const validation = {
  inputObject,
};
