import * as Joi from "joi";
import { IPost } from "types";

export const blogEditSchema = (
  errorLocation: string,
  data: IPost
): Joi.ObjectSchema => {
  return Joi.object({
    content: Joi.string()
      .required()
      .messages({
        "string.base": `'content' should be a type of 'string', user input is ${String(
          data.content
        )}`,
        "string.empty": `'content' should not be empty`,
      }),
  });
};
