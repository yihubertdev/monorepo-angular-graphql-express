import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  hello() {
    return { id: "hello1" };
  }

  @FieldResolver({
    type: RESOLVER_TYPE.SUB_QUERY,
    subQuery: "User",
  })
  name() {
    return "myname";
  }

  @FieldResolver({
    type: RESOLVER_TYPE.MUTATION,
  })
  postUser(source, args, context, info) {
    console.log(args);
    const i = 1;
    return "hello";
  }
}

export default new UserResolver();
