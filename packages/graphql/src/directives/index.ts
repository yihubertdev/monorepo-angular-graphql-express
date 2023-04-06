import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";

interface DirectiveInterface {
  name: string;
  transformer: (schema: GraphQLSchema, directiveName: string) => GraphQLSchema;
}

const UpperDirective: DirectiveInterface = {
  name: "upper",
  transformer: (schema: GraphQLSchema, directiveName: string) => {
    return mapSchema(schema, {
      // Executes once for each object field in the schema
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        // Check whether this field has the specified directive
        const upperDirective = getDirective(
          schema,
          fieldConfig,
          directiveName
        )?.[0];

        if (upperDirective) {
          const { test } = upperDirective;
          // Get this field's original resolver
          const { resolve = defaultFieldResolver } = fieldConfig;

          // Replace the original resolver with a function that *first* calls
          // the original resolver, then converts its result to upper case
          fieldConfig.resolve = async (source, args, context, info) => {
            const result = await resolve(source, args, context, info);
            console.log(result);
            if (typeof result === "string") {
              return result.toUpperCase();
            }
            return result;
          };
          return fieldConfig;
        }
        return fieldConfig;
      },
    });
  },
};

export default [UpperDirective];
