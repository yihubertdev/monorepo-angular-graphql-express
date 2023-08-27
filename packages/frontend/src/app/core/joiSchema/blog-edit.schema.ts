import * as Joi from "joi";
import { IPost } from "types";
import { JoiSchemaBuilder } from "../utils/validator";

export const blogEditSchema: JoiSchemaBuilder<IPost> = (
  data: IPost,
  errorLocation?: string
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
