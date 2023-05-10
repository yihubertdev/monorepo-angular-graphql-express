import { RequestHandler, Router } from "express";
import Joi from "joi";
import { isNil } from "lodash";
import middleware from "../middleware";
import { API_METHOD, AUTHENTICATION_TYPE } from "./constants";

interface IFaceOptions {
  PATH: string;
  METHOD: API_METHOD;
  AUTH?: AUTHENTICATION_TYPE;
  VALIDATION?: Partial<
    Record<"query" | "params" | "body", Joi.ObjectSchema<any>>
  >;
  MIDDLEWARE?: RequestHandler[];
}

export const appRouter = Router();

/**
 * Decorator function to convert into normal express routes
 *
 * @param {IOptions} options
 * @returns {any}
 */
const RoutesDecorator = (options: IFaceOptions): any => {
  return (target: any, propertyKey: string): Router => {
    const requestHandlers: RequestHandler[] = [];
    if (!isNil(options.VALIDATION)) {
      requestHandlers.push(
        middleware.joi.validateObjectSchema(options.VALIDATION)
      );
    }
    if (!isNil(options.MIDDLEWARE)) {
      requestHandlers.push(...options.MIDDLEWARE);
    }
    requestHandlers.push(target[propertyKey]);
    return appRouter[options.METHOD](options.PATH, requestHandlers);
  };
};

export default RoutesDecorator;
