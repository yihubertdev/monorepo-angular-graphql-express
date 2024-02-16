import { FieldResolver, RESOLVER_TYPE } from "../decorators/resolver";
import { gql } from "apollo-server";

class ArticleResolver {
  @FieldResolver({
    schema: gql`
      extend type Query {
        anotherhello: String
      }
    `,
    type: RESOLVER_TYPE.QUERY,
  })
  anotherhello() {
    const i = 1;
    return i;
  }

  @FieldResolver({
    schema: gql`
      extend type Query {
        anotherAnotherHello: String
      }
    `,
    type: RESOLVER_TYPE.QUERY,
  })
  anotherAnotherHello() {
    const i = 1;
    return "hello1";
  }
}

export default new ArticleResolver();
