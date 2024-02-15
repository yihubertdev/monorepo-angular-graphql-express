"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = exports.FieldResolver = exports.totalTypeDefs = exports.totalResolver = exports.RESOLVER_TYPE = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = tslib_1.__importDefault(require("../utils"));
const scalars_1 = tslib_1.__importDefault(require("./scalars"));
var RESOLVER_TYPE;
(function (RESOLVER_TYPE) {
    RESOLVER_TYPE["QUERY"] = "Query";
    RESOLVER_TYPE["MUTATION"] = "Mutation";
    RESOLVER_TYPE["SUBSCRIPTION"] = "Subscription";
    RESOLVER_TYPE["SCALAR"] = "Scalar";
    RESOLVER_TYPE["SUB_QUERY"] = "SUB_QUERY";
})(RESOLVER_TYPE || (exports.RESOLVER_TYPE = RESOLVER_TYPE = {}));
exports.totalResolver = {};
exports.totalTypeDefs = [
    fs_1.default.readFileSync(path_1.default.join(__dirname, "../controller/schema.graphql"), "utf8"),
];
// Change the reference value directly, no need to return. variable is a reference to an object or arrays in ts
utils_1.default.graphql.addScalars(exports.totalResolver, exports.totalTypeDefs, scalars_1.default);
/**
 * Decorator for field RESOLVER_TYPE inside resolver
 * @param {RESOLVER_TYPE} params.type resolver type
 * @returns {TypeMethodDecoratorResponse}
 */
function FieldResolver(params) {
    const { type, description, subQuery } = params;
    return (target, name, // class function name
    propertyDescriptor // class function content
    ) => {
        switch (type) {
            case RESOLVER_TYPE.QUERY:
            case RESOLVER_TYPE.MUTATION:
                return (exports.totalResolver = (0, lodash_1.merge)(exports.totalResolver, Object.defineProperty({}, type, {
                    configurable: true,
                    enumerable: true,
                    value: Object.defineProperty({}, name, {
                        configurable: true,
                        enumerable: true,
                        value: propertyDescriptor.value,
                    }),
                })));
            case RESOLVER_TYPE.SUBSCRIPTION:
                return (exports.totalResolver = (0, lodash_1.merge)(exports.totalResolver, Object.defineProperty({}, type, {
                    configurable: true,
                    enumerable: true,
                    value: Object.defineProperty({}, name, {
                        configurable: true,
                        enumerable: true,
                        value: {
                            resolve: (rootValue) => rootValue,
                            subscribe: propertyDescriptor.value,
                        },
                    }),
                })));
            case RESOLVER_TYPE.SUB_QUERY:
                if (!subQuery) {
                    throw Error("subQuery not provided");
                }
                return (exports.totalResolver = (0, lodash_1.merge)(exports.totalResolver, Object.defineProperty({}, subQuery, {
                    configurable: true,
                    enumerable: true,
                    value: Object.defineProperty({}, name, {
                        configurable: true,
                        enumerable: true,
                        value: propertyDescriptor.value,
                    }),
                })));
            default:
                throw new Error(`Field Type ${type} not supported`);
        }
    };
}
exports.FieldResolver = FieldResolver;
const Resolver = (typeDefs) => {
    return (target) => {
        exports.totalTypeDefs.push(typeDefs);
    };
};
exports.Resolver = Resolver;
//# sourceMappingURL=resolver.js.map