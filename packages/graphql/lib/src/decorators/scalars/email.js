"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailScalar = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const base_1 = require("./base");
const utils_1 = tslib_1.__importDefault(require("../../utils"));
const graphql_1 = require("graphql");
class EmailScalar extends base_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = "EMAIL";
        this.description = "email description";
        this.schema = joi_1.default.string().email();
        this.parseLiteral = (params) => {
            if (params.kind === graphql_1.Kind.STRING) {
                utils_1.default.schema.validate(this.schema, params.value);
                return params.value;
            }
            throw Error;
        };
        this.parseValue = (params) => {
            utils_1.default.schema.validate(this.schema, params);
            return params;
        };
    }
}
exports.EmailScalar = EmailScalar;
exports.default = new EmailScalar();
//# sourceMappingURL=email.js.map