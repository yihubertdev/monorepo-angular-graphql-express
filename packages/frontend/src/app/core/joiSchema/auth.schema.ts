import * as Joi from "joi";
import { FILE_TYPE, INPUT_TYPE, IUserProfile } from "sources-types";
import { JoiSchemaBuilder } from "../utils/validator";
import { IFormUploaderInput } from "../static/auth.static";

export const accountSchema: JoiSchemaBuilder<IUserProfile> = (
  data: IUserProfile,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({
    displayName: Joi.string()
      .optional()
      .messages({
        "string.base": `'displayName' should be a type of 'string', user input is ${String(
          data.displayName
        )}`,
        "string.empty": `'displayName' should not be empty`,
      }),
    photoURL: Joi.string()
      .optional()
      .messages({
        "string.base": `'photoURL' should be a type of 'string', user input is ${String(
          data.photoURL
        )}`,
        "string.empty": `'photoURL' should not be empty`,
      }),
    location: Joi.string()
      .optional()
      .messages({
        "string.base": `'location' should be a type of 'string', user input is ${String(
          data.location
        )}`,
        "string.empty": `'location' should not be empty`,
      }),
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
        "string.empty": `'email' should not be empty`,
      }),
    phone: Joi.number()
      .optional()
      .messages({
        "number.base": `'phone' should be a number, user input is ${String(
          data.phone
        )}`,
        "number.empty": `'phone' should not be empty`,
      }),
    image: Joi.string()
      .optional()
      .allow(null, "")
      .messages({
        "string.base": `'image' should be a type of 'string', user input is ${String(
          data.photoURL
        )}`,
      }),
  });
};

export const homeAdressSchema: JoiSchemaBuilder<IUserProfile> = (
  data: IUserProfile,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({});
};

export const SETTINGS_SCHEMA_GENERATOR = (data: IFormUploaderInput[]) => {
  const result: Record<string, Joi.StringSchema<string> | Joi.ArraySchema> = {};
  data.forEach((item) => {
    switch (item.type) {
      case INPUT_TYPE.UPLOAD:
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

export const PDF_FILE_SCHEMA: JoiSchemaBuilder<{
  type: FILE_TYPE[];
  name: string;
  size: number;
}> = (data: {
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
