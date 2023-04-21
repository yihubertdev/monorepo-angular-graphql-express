import path from "path";
import fs from "fs";
import { FieldResolver, Resolver } from "../../decorators/resolver";

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
