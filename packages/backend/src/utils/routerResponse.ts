import { Response } from "express";
import { isNil } from "lodash";
import {
  HTTP_CODES,
  API_RESPONSE_FAILURE_MESSAGE,
  API_RESPONSE_GENERIC_MESSAGE,
  API_RESPONSE_SUCCESS_MESSAGE,
} from "./decorators";

type TypeApiResponse =
  | API_RESPONSE_FAILURE_MESSAGE
  | API_RESPONSE_SUCCESS_MESSAGE
  | API_RESPONSE_GENERIC_MESSAGE;

/**
 * Common function used to send json response with data and optional error message
 * Moving outside of the class since decorator is pulling the method outside of the class and assign it to route
 * @param {Response} res
 * @param {{ code: HTTP_CODES; message: TypeApiResponse; error?: any }} data
 * @returns {void}
 */
function jsonResponse(
  res: Response,
  data: { code: HTTP_CODES; message: TypeApiResponse; error?: any }
): void {
  res.type("application/json");
  res.status(data.code).json({
    message: data.message,
    // error can be any type so we cannot restrict it
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error: data.error,
  });
}

export class ResponseHandler {
  /**
   * Common function used to send json response success message and with data, if any
   * @param {Response} res
   * @param {TypeApiResponse} message
   * @param {T} [data]
   * @returns {void}
   */
  protected okMessage<T>(
    res: Response,
    message: TypeApiResponse,
    data?: T
  ): void {
    res.type("application/json");
    if (isNil(data)) {
      res.status(HTTP_CODES.OK).json({
        message,
      });
      return;
    }
    res.status(HTTP_CODES.OK).json({
      message,
      data,
    });
  }

  /**
   * Common function used to send json success response with data, if any
   * @param {Response} res
   * @param {T} [data]
   * @returns {void}
   */
  protected ok<T>(res: Response, data?: T): void {
    if (isNil(data)) {
      res.sendStatus(HTTP_CODES.OK);
      return;
    }
    res.type("application/json");
    res.status(HTTP_CODES.OK).json({
      data,
    });
  }

  /**
   * Common function used to send custom data format response
   * @param {Response} res
   * @param {T} data
   * @returns {void}
   */
  protected okCustom<T>(res: Response, data: T): void {
    res.type("application/json");
    res.status(HTTP_CODES.OK).json(data);
  }

  /**
   * Common function used to send redirect user to some other url or page
   * @param {Response} res
   * @returns {void}
   */
  protected redirect(res: Response, url: URL): void {
    res.redirect(url.toString());
  }

  /**
   * Common function used to send response when something is created
   * @param {Response} res
   * @returns {void}
   */
  protected created(res: Response): void {
    res.sendStatus(HTTP_CODES.CREATED);
  }

  /**
   * Common function used to send json response when there is some JOI validation error
   * @param {Response} res
   * @param {any} [error]
   * @param {TypeApiResponse} [message]
   * @returns {void}
   */
  protected joiError(
    res: Response,
    error?: any,
    message?: TypeApiResponse
  ): void {
    jsonResponse(res, {
      code: HTTP_CODES.BAD_REQUEST,
      message: message ?? API_RESPONSE_GENERIC_MESSAGE.JOI_VALIDATION_ERROR,
      // error can be any type so we cannot restrict it
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error,
    });
  }

  /**
   * Common function used to send json response when there is a bad request sent by client
   * @param {Response} res
   * @param {TypeApiResponse} [message]
   * @param {any} [error]
   * @returns {void}
   */
  protected clientError(
    res: Response,
    message?: TypeApiResponse,
    error?: any
  ): void {
    jsonResponse(res, {
      code: HTTP_CODES.BAD_REQUEST,
      message: message ?? API_RESPONSE_GENERIC_MESSAGE.BAD_REQUEST,
      // error can be any type so we cannot restrict it
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error,
    });
  }

  /**
   * Common function used to send json response when user is not authorized for action
   * @param {Response} res
   * @param {TypeApiResponse} [message]
   * @returns {void}
   */
  protected unauthorized(res: Response, message?: TypeApiResponse): void {
    jsonResponse(res, {
      code: HTTP_CODES.UNAUTHORIZED,
      message: message ?? API_RESPONSE_GENERIC_MESSAGE.UNAUTHORIZED,
    });
  }

  /**
   * Common function used to send json response when user is not allowed for action
   * @param {Response} res res
   * @param {TypeApiResponse} [message] m
   * @returns {void}
   */
  protected forbidden(res: Response, message?: TypeApiResponse): void {
    jsonResponse(res, {
      code: HTTP_CODES.FORBIDDEN,
      message: message ?? API_RESPONSE_GENERIC_MESSAGE.FORBIDDEN,
    });
  }

  /**
   * Common function used to send json response when entity is not present
   * @param {Response} res
   * @param {TypeApiResponse} [message]
   * @returns {void}
   */
  protected notFound(res: Response, message?: TypeApiResponse): void {
    jsonResponse(res, {
      code: HTTP_CODES.NOT_FOUND,
      message: message ?? API_RESPONSE_GENERIC_MESSAGE.NOT_FOUND,
    });
  }

  /**
   * Common function used to send json response when there is some internal server error
   * @param {Response} res
   * @param {Error | TypeApiResponse | string} [error]
   * @returns {void}
   */
  protected fail(
    res: Response,
    error?: Error | TypeApiResponse | string
  ): void {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      message: error
        ? error.toString()
        : API_RESPONSE_GENERIC_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
}
