import path from "path";
import fs from "fs";
import { FieldResolver, Resolver } from "../../decorators/graphql";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver("Query")
  hello(parent, args, contextValue, info) {
    console.log(parent);
    return { id: "hello1" };
  }

  @FieldResolver("Mutation")
  helloMutation() {
    const i = 1;
    return "hello1";
  }

  @FieldResolver("user")
  name() {
    return "myname";
  }
}

export default new UserResolver();
