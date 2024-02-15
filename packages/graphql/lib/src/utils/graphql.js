"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScalars = void 0;
const lodash_1 = require("lodash");
const graphql_1 = require("graphql");
/**
 * Validates an arbitrary object against a Joi schema
 *
 * @param {Joi.ObjectSchema<any>} schema
 * @param {object} params
 * @returns {T | unknown}
 * @throws {OnmoValidationError} - If the validation failed
 */
function addScalars(resolvers, typeDefs, scalars) {
    Object.keys(scalars).forEach((key) => {
        const { name, description, parseLiteral, parseValue, serialize } = scalars[key];
        typeDefs.unshift(`scalar ${name}`);
        (0, lodash_1.merge)(resolvers, Object.defineProperty({}, name, {
            configurable: true,
            enumerable: true,
            value: new graphql_1.GraphQLScalarType({
                name,
                description,
                serialize,
                parseValue,
                parseLiteral,
            }),
        }));
    });
}
exports.addScalars = addScalars;
//# sourceMappingURL=graphql.js.map