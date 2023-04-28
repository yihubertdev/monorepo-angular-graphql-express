import Joi from "joi";
import { BaseScalar } from "./base";
import utils from "../../utils";
import { Kind, ValueNode } from "graphql";

export class EmailScalar extends BaseScalar<string, string> {
  name = "EMAIL";
  description = "email description";
  override schema = Joi.string().email();

  override parseLiteral = (params: ValueNode) => {
    if (params.kind === Kind.STRING) {
      utils.schema.validate(this.schema, params.value);
      return params.value;
    }

    throw Error;
  };

  override parseValue = (params: unknown) => {
    utils.schema.validate(this.schema, params);
    return params as string;
  };
}

export default new EmailScalar();
