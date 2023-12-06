import * as Joi from "joi";
import { IUserLogin, IUserSignUpForm } from "sources-types";
import { JoiSchemaBuilder } from "../utils/validator";

export const userLoginSchema: JoiSchemaBuilder<IUserLogin> = (
  data: IUserLogin,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({
    email: Joi.string()
      .optional()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .messages({
        "string.base": `'email' should be a type of 'string', user input is ${String(
          data.email
        )}`,
        "object.regex": `'email' should follow email pattern, user input is ${String(
          data.email
        )}`,
        "string.pattern.base": `'email' should follow email pattern, user input is ${String(
          data.email
        )}`,
      }),
    password: Joi.string()
      .optional()
      .messages({
        "string.base": `password should be a type of 'string', user input is ${String(
          data.password
        )}`,
      }),
  });
};

export const userSignUpSchema: JoiSchemaBuilder<IUserSignUpForm> = (
  data: IUserSignUpForm,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({
    displayName: Joi.string().required().messages({
      "string.base": `'username' should be a type of 'string'`,
      "string.empty": `Please enter your name`,
    }),
    email: Joi.string()
      .required()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .messages({
        "string.base": `'email' should be a type of 'string'`,
        "object.regex": `'email' should follow email pattern`,
        "string.pattern.base": `'email' should follow email pattern`,
        "string.empty": `Please enter your email.`,
      }),
    password: Joi.string().required().messages({
      "string.base": `password should be a type of 'string'`,
      "string.empty": `Please enter your password.`,
    }),
    repeatPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `password should be a type of 'string'`,
        "any.only": "Password and repeat password must be equal",
        "string.empty": `Please enter your password.`,
      }),
  });
};
