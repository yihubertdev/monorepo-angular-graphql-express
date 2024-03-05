import Joi from "joi";

/**
 * Validates an arbitrary object against a Joi schema
 * @param {Joi.ObjectSchema<any>} schema joi schema
 * @param {object} params T
 * @returns {object} value
 */
export function validate<T>(
  schema:
    | Joi.ObjectSchema<unknown>
    | Joi.ArraySchema
    | Joi.StringSchema<unknown>,
  params: T | unknown
): T {
  // Joi returns `any` as a type rather than `unknown`, so eslint complains about us destructuring it
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value, error } = schema.validate(params, { abortEarly: false });
  if (error) {
    const { details } = error as { details: { message: string }[] };
    const message = details.map((detail): string => detail.message).join(", ");
    throw new Error(message);
  }
  return value as T;
}
