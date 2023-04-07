import path from "path";
import fs from "fs";
import { FieldResolver, Resolver } from "../../decorators/graphql";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class ArticleResolver {
  @FieldResolver({
    type: "Query",
  })
  anotherhello() {
    const i = 1;
    return i;
  }

  @FieldResolver({
    type: "Query",
  })
  anotherAnotherHello() {
    const i = 1;
    return "hello1";
  }
}

export default new ArticleResolver();
