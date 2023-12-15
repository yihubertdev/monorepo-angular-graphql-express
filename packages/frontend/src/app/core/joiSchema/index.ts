import * as Joi from "joi";
import { FILE_TYPE, INPUT_TYPE } from "sources-types";
import { JoiSchemaBuilder } from "../utils/validator";
import { IForm } from "../static/form.static";

export const accountSchema: JoiSchemaBuilder = Joi.object({
  displayName: Joi.string().optional().messages({
    "string.base": `'displayName' should be a type of 'string'`,
    "string.empty": `'displayName' should not be empty`,
  }),
  photoURL: Joi.string().optional().messages({
    "string.base": `'photoURL' should be a type of 'string'`,
    "string.empty": `'photoURL' should not be empty`,
  }),
  location: Joi.string().optional().messages({
    "string.base": `'location' should be a type of 'string'`,
    "string.empty": `'location' should not be empty`,
  }),
  email: Joi.string()
    .optional()
    .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .messages({
      "string.base": `'email' should be a type of 'string'`,
      "object.regex": `'email' should follow email pattern`,
      "string.pattern.base": `'email' should follow email pattern`,
      "string.empty": `'email' should not be empty`,
    }),
  phone: Joi.number().optional().messages({
    "number.base": `'phone' should be a number`,
    "number.empty": `'phone' should not be empty`,
  }),
  image: Joi.string().optional().allow(null, "").messages({
    "string.base": `'image' should be a type of 'string'`,
  }),
});

export const SIGNUP_PHONE_NUMBER: JoiSchemaBuilder = Joi.object({
  phoneNumber: Joi.number().optional().messages({
    "number.base": `'phone' should be a number`,
    "number.empty": `'phone' should not be empty`,
  }),
});

export const SETTINGS_SCHEMA_GENERATOR = (data: IForm[]) => {
  const result: Record<string, Joi.StringSchema<string> | Joi.ArraySchema> = {};
  data.forEach((item) => {
    switch (item.type) {
      case INPUT_TYPE.FILE:
        result[item.key] = Joi.array()
          .length(1)
          .items(
            Joi.string()
              .required()
              .error((err) => {
                err.forEach((e) => {
                  switch (e.code) {
                    case "string.empty":
                      e.message = "No Document be selected";
                      break;
                    default:
                      break;
                  }
                });

                return err;
              })
          );
        break;

      default:
        result[item.key] = Joi.string()
          .required()
          .max(100)
          .error((err) => {
            err.forEach((e) => {
              switch (e.code) {
                case "string.base":
                  e.message = e.local.label + " must be a string";
                  break;
                case "string.empty":
                  e.message = e.local.label + " is requried";
                  break;
                default:
                  break;
              }
            });

            return err;
          });
    }
  });

  return Joi.object(result);
};

export const PDF_FILE_SCHEMA = (data: {
  type: FILE_TYPE[];
  name: string;
  size: number;
}): Joi.ArraySchema => {
  const { type, name, size } = data;
  return Joi.array()
    .length(1)
    .items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string()
          .valid(...type)
          .error((err) => {
            err.forEach((e) => {
              switch (e.code) {
                case "any.only":
                  e.message = `${name} document must be PDF`;
                  break;
                default:
                  break;
              }
            });

            return err;
          }),
        size: Joi.number().max(size).required(), // 5mb
      })
    );
};

export const IMAGE_FILE_SCHEMA = (data: {
  type: FILE_TYPE[];
  name: string;
  size: number;
}): Joi.ArraySchema => {
  const { type, name, size } = data;
  return Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      type: Joi.string()
        .required()
        .valid(...type)
        .error((err) => {
          err.forEach((e) => {
            switch (e.code) {
              case "any.only":
                e.message = `${name} document must be PDF`;
                break;
              default:
                break;
            }
          });

          return err;
        }),
      size: Joi.number().max(size).required(), // 5mb
    })
  );
};
export const articleEditSchema = Joi.object({
  content: Joi.string().optional().messages({
    "string.base": `'content' should be a type of 'string'`,
    "string.empty": `'content' should not be empty`,
  }),
});

export const blogEditSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.base": `'content' should be a type of 'string'`,
    "string.empty": `'content' should not be empty`,
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string()
    .optional()
    .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .messages({
      "string.base": `'email' should be a type of 'string'`,
      "object.regex": `'email' should follow email pattern`,
      "string.pattern.base": `'email' should follow email pattern`,
    }),
  password: Joi.string().optional().messages({
    "string.base": `password should be a type of 'string'`,
  }),
});

export const userSignUpSchema: Joi.ObjectSchema = Joi.object({
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
  repeatPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.base": `password should be a type of 'string'`,
    "any.only": "Password and repeat password must be equal",
    "string.empty": `Please enter your password.`,
  }),
});

export const phoneRegisterSchema = Joi.object({
  area: Joi.string().required(),
  phone: Joi.number().required(),
});

export const phoneVerifySchema = Joi.object({
  verifyCode: Joi.number().required(),
});
