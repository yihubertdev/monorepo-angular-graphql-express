import Joi from "joi";
import { Scalar } from "../decorators/resolver";

class ScalarDefinition {
  @Scalar({
    description: "Input variable must match email format",
    schema: Joi.string().email(),
  })
  public EMAIL?: string;

  @Scalar({
    description: "Input variable must match uuid format",
    schema: Joi.string().uuid(),
  })
  public UUID?: string;
}

export default new ScalarDefinition();
