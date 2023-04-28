import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { BaseDirective } from "./base";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";

class StringValidation extends BaseDirective {
  name = "StringValidation";
  private typeDirectiveArgumentMaps: Record<string, any> = {};

  transformer(schema: GraphQLSchema) {
    console.log("trigger");
    return mapSchema(schema, {
      [MapperKind.INPUT_OBJECT_FIELD]: (
        fieldConfig,
        fieldName: string,
        typeName: string
      ) => {
        const directive = getDirective(schema, fieldConfig, this.name)?.[0];
        if (directive) {
          console.log(fieldConfig);
          this.typeDirectiveArgumentMaps[typeName] = {
            directive,
            typeName,
            fieldName,
          };
        }
        return fieldConfig;
      },
      // Executes once for each object field in the schema
      [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
        // Check whether this field has the specified directive
        const directive = getDirective(schema, fieldConfig, this.name)?.[0];

        if (directive) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          console.log(resolve);
          fieldConfig.resolve = async function (source, args, context, info) {
            //const result = await resolve(source, args, context, info);
            //return result;
          };
          return fieldConfig;
        }
        return fieldConfig;
      },
    });
  }
}
