import * as Joi from "joi";
import {
  IFileValidation,
  IProfileHomeAddress,
  IUserProfile,
} from "sources-types";
import { JoiSchemaBuilder } from "../utils/validator";
import {
  NOTICE_OF_ASSESSMENT_FORM,
  TAX_RETURN_FORM,
} from "../static/auth.static";

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

export const homeAdressSchema: JoiSchemaBuilder<IProfileHomeAddress> = (
  data: IProfileHomeAddress,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({});
};

export const employmentSchema: JoiSchemaBuilder<IProfileHomeAddress> = (
  data: IProfileHomeAddress,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({});
};

export const PERSONAL_DOCUMENT_SCHEMA: JoiSchemaBuilder<IProfileHomeAddress> = (
  data: IProfileHomeAddress,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({});
};

export const TAX_RETURN_SCHEMA: JoiSchemaBuilder<IProfileHomeAddress> = (
  data: IProfileHomeAddress,
  errorLocation?: string
): Joi.ObjectSchema => {
  const taxReturn: Record<string, Joi.StringSchema> = {};
  TAX_RETURN_FORM.forEach((item) => {
    taxReturn[item.key] = Joi.string()
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
      });
  });

  return Joi.object(taxReturn);
};

export const NOTICE_OF_ASSESSMENT_SCHEMA: JoiSchemaBuilder<
  IProfileHomeAddress
> = (data: IProfileHomeAddress, errorLocation?: string): Joi.ObjectSchema => {
  const taxReturn: Record<string, Joi.ArraySchema> = {};
  NOTICE_OF_ASSESSMENT_FORM.forEach((item) => {
    taxReturn[item.key] = Joi.array()
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
  });

  return Joi.object(taxReturn);
};

export const NOTICE_OF_ASSESSMENT_FILE_SCHEMA: JoiSchemaBuilder<
  IFileValidation
> = (data: IFileValidation, errorLocation?: string): Joi.ArraySchema => {
  return Joi.array()
    .length(1)
    .items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string()
          .valid("application/pdf")
          .error((err) => {
            err.forEach((e) => {
              switch (e.code) {
                case "any.only":
                  e.message = "Notice Of Assessment document must be PDF";
                  break;
                default:
                  break;
              }
            });

            return err;
          }),
        size: Joi.number().max(5242880).required(), // 5mb
      })
    );
};

export const TAX_RETURN_FILE_SCHEMA: JoiSchemaBuilder<IFileValidation> = (
  data: IFileValidation,
  errorLocation?: string
): Joi.ArraySchema => {
  return Joi.array()
    .length(1)
    .items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string()
          .valid("application/pdf")
          .error((err) => {
            err.forEach((e) => {
              switch (e.code) {
                case "any.only":
                  e.message = "Tax return document must be PDF";
                  break;
                default:
                  break;
              }
            });

            return err;
          }),
        size: Joi.number().max(5242880).required(), // 5mb
      })
    );
};
