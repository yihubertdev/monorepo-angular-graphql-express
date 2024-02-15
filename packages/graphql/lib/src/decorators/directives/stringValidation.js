"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const base_1 = require("./base");
const utils_1 = require("@graphql-tools/utils");
class StringValidation extends base_1.BaseDirective {
    constructor() {
        super(...arguments);
        this.name = "StringValidation";
        this.typeDirectiveArgumentMaps = {};
    }
    transformer(schema) {
        console.log("trigger");
        return (0, utils_1.mapSchema)(schema, {
            [utils_1.MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
                const directive = (0, utils_1.getDirective)(schema, fieldConfig, this.name)?.[0];
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
            [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
                // Check whether this field has the specified directive
                const directive = (0, utils_1.getDirective)(schema, fieldConfig, this.name)?.[0];
                if (directive) {
                    const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
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
//# sourceMappingURL=stringValidation.js.map