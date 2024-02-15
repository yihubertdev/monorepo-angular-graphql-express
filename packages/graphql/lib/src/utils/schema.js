"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Validates an arbitrary object against a Joi schema
 *
 * @param {Joi.ObjectSchema<any>} schema
 * @param {object} params
 * @returns {T | unknown}
 * @throws {OnmoValidationError} - If the validation failed
 */
function validate(schema, params) {
    // Joi returns `any` as a type rather than `unknown`, so eslint complains about us destructuring it
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value, error } = schema.validate(params, { abortEarly: false });
    if (error) {
        const { details } = error;
        const message = details.map((detail) => detail.message).join(", ");
        throw new Error(message);
    }
    return value;
}
exports.validate = validate;
//# sourceMappingURL=schema.js.map