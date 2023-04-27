import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class ArticleResolver {
  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  anotherhello() {
    const i = 1;
    return i;
  }

  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  anotherAnotherHello() {
    const i = 1;
    return "hello1";
  }
}

export default new ArticleResolver();
