import * as Joi from "joi";
import { IBlog } from "../models/blog.type";
import { JoiSchemaBuilder } from "../utils/validator";
// Make sure schema object key match to the form list key
export const articleEditSchema: JoiSchemaBuilder<IBlog> = (
  data: IBlog,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({
    content: Joi.string()
      .optional()
      .messages({
        "string.base": `'content' should be a type of 'string', user input is ${String(
          data.content
        )}`,
        "string.empty": `'content' should not be empty`,
      }),
  });
};
