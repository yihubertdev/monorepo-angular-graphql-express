import path from "path";
import fs from "fs";
import { FieldResolver, Resolver } from "../../decorators/graphql";
import Joi from "joi";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver({
    type: "Query",
  })
  hello() {
    return { id: "hello1" };
  }

  @FieldResolver({
    type: "Mutation",
    validation: Joi.object({
      content: Joi.string().optional().messages({
        "string.base": `'content' should be a type of 'string'`,
        "string.empty": `'content' should not be empty`,
      }),
    }),
  })
  postUser() {
    const i = 1;
    return "hello1";
  }

  @FieldResolver({
    type: "user",
  })
  name() {
    return "myname";
  }
}

export default new UserResolver();
