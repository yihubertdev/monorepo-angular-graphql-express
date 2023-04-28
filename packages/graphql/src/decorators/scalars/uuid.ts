import Joi from "joi";
import { BaseScalar } from "./base";
import utils from "../../utils";
import { Kind, ValueNode } from "graphql";

export class UUIDScalar extends BaseScalar<string, string> {
  name = "UUID";
  description = "email description";
  override schema = Joi.string().guid();

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

export default new UUIDScalar();
