import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";

export interface IFaceScalar<T> {
  /**
   * Convert outgoing data to desired type for JSON
   * @returns {any}
   */
  serialize?: (value: T) => any;

  /**
   * Convert incoming data to desired type
   * @returns {any}
   */
  parseValue?: (value: T) => any;

  /**
   * Convert incoming data to desired type
   * @returns {any}
   */
  parseLiteral?: (value: T) => any;
}

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  hello() {
    return { id: "hello1" };
  }

  @FieldResolver({
    type: RESOLVER_TYPE.MUTATION,
  })
  postUser() {
    const i = 1;
    return "hello1";
  }

  @FieldResolver({
    type: RESOLVER_TYPE.SUB_QUERY,
    subQuery: "User",
  })
  name() {
    return "myname";
  }

  @FieldResolver({
    type: RESOLVER_TYPE.SCALAR,
  })
  UserId(): IFaceScalar<string> {
    return {
      serialize: (value: string) => {
        console.log(value);
        return "hello"; // Convert outgoing Date to integer for JSON
      },
      parseValue(value: string) {
        console.log(value);
        return "hello"; // Convert incoming integer to Date
      },
      parseLiteral(value: string) {
        console.log(value);
        return "hello"; // Convert hard-coded AST string to integer and then to Date
      },
    };
  }
}

export default new UserResolver();
