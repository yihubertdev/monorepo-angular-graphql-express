import * as Joi from "joi";
import { IUserProfile } from "../models/users.type";

export const accountSchema = (errorLocation: string, data: IUserProfile): Joi.ObjectSchema => {
  return Joi.object({
    displayName: Joi.string()
      .optional()
      .messages({
        "string.base": `'displayName' should be a type of 'string', user input is ${String(data.displayName)}`,
        "string.empty": `'displayName' should not be empty`,
      }),
    photoURL: Joi.string()
      .optional()
      .messages({
        "string.base": `'photoURL' should be a type of 'string', user input is ${String(data.photoURL)}`,
        "string.empty": `'photoURL' should not be empty`,
      }),
    location: Joi.string()
      .optional()
      .messages({
        "string.base": `'location' should be a type of 'string', user input is ${String(data.location)}`,
        "string.empty": `'location' should not be empty`,
      }),
    email: Joi.string()
      .optional()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .messages({
        "string.base": `'email' should be a type of 'string', user input is ${String(data.email)}`,
        "object.regex": `'email' should follow email pattern, user input is ${String(data.email)}`,
        "string.pattern.base": `'email' should follow email pattern, user input is ${String(data.email)}`,
        "string.empty": `'email' should not be empty`,
      }),
    phone: Joi.number()
      .optional()
      .messages({
        "number.base": `'phone' should be a number, user input is ${String(data.phone)}`,
        "number.empty": `'phone' should not be empty`,
      }),
    image: Joi.string()
      .optional()
      .allow(null, "")
      .messages({
        "string.base": `'image' should be a type of 'string', user input is ${String(data.photoURL)}`,
      }),
  });
};
