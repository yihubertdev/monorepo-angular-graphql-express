import path from "path";
import fs from "fs";
import { Mutation, Query, Resolver } from "../../decorators/graphql";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class ArticleResolver {
  @Query()
  anotherhello() {
    const i = 1;
    return i;
  }

  @Query()
  anotherAnotherHello() {
    const i = 1;
    return "hello1";
  }
}

export default new ArticleResolver();
