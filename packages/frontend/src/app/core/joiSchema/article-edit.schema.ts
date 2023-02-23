import * as Joi from "joi";
import { IBlog } from "../models/blog.type";
// Make sure schema object key match to the form list key
export const articleEditSchema = (errorLocation: string, data: IBlog): Joi.ObjectSchema => {
  return Joi.object({
    content: Joi.string()
      .optional()
      .messages({
        "string.base": `'content' should be a type of 'string', user input is ${String(data.content)}`,
        "string.empty": `'content' should not be empty`,
      }),
  });
};
