import { FieldResolver } from "../decorators/resolver";

class StringScalar {
  @FieldResolver({
    type: "scalar",
  })
  userId() {
    return {
      serialize(value: string) {
        console.log(value); // Convert outgoing Date to integer for JSON
      },
      parseValue(value: string) {
        console.log(value); // Convert incoming integer to Date
      },
      parseLiteral(value: string) {
        console.log(value); // Convert hard-coded AST string to integer and then to Date
      },
    };
  }
}

export default new StringScalar();
