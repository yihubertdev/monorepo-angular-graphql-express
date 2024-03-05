import { NextFunction, Request, Response, RequestHandler } from "express";
import { ResponseHandler } from "./routerResponse";
import { isNil } from "lodash";
import Joi from "joi";
class JoiValidation extends ResponseHandler {
  /**
   * Validates the schema object using joi
   * @param {Partial<Record<"query" | "params" | "body", Joi.ObjectSchema<any>>>} schema schema
   * @returns {RequestHandler} validate result
   */
  validateObjectSchema = (
    schema: Partial<
      Record<"query" | "params" | "body", Joi.ObjectSchema<unknown>>
    >
  ): RequestHandler => {
    /**
     * Validates schema using joi with validation object
     * @param {Request} req req
     * @param {Response} res res
     * @param {NextFunction} next next
     * @returns {void}
     */
    return (req: Request, res: Response, next: NextFunction): void => {
      if (schema.params) {
        const { error: errorParam } = schema.params.validate(req.params, {
          abortEarly: false,
        });
        if (!isNil(errorParam)) {
          super.joiError(
            res,
            errorParam.details.map((e) => ({
              message: e.message,
              key: e.context?.key ?? "unknown",
            }))
          );
          return;
        }
      }
      if (schema.query) {
        const { error: errorQuery } = schema.query.validate(req.query, {
          abortEarly: false,
        });
        if (!isNil(errorQuery)) {
          super.joiError(
            res,
            errorQuery.details.map((e) => ({
              message: e.message,
              key: e.context?.key ?? "unknown",
            }))
          );
          return;
        }
      }
      if (schema.body) {
        const { error: errorBody } = schema.body.validate(req.body, {
          abortEarly: false,
        });
        if (!isNil(errorBody)) {
          super.joiError(
            res,
            errorBody.details.map((e) => ({
              message: e.message,
              key: e.context?.key ?? "unknown",
            }))
          );
          return;
        }
      }

      next();
    };
  };
}

export default new JoiValidation();
