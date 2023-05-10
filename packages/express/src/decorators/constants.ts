export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  redirect = 301,
}

export enum API_RESPONSE_GENERIC_MESSAGE {
  SUCCESS = "SUCCESS",
  CREATED = "CREATED",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  JOI_VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export enum API_RESPONSE_SUCCESS_MESSAGE {
  SUCCESS = "Request successfully completed",
  USER_BALANCE_RESET = "User balance was reset successfully",
  DELETE_USER = "User was deleted successfully",
  INGESTION_SUCCESSFUL = "Ingestion of games and moments is completed",
}

export enum API_RESPONSE_FAILURE_MESSAGE {
  AUTHORIZATION_HEADER_REQUIRED = "Authorization header is required",
  INVALID_API_KEY_FORMAT = "Format given for api key is invalid",
  INVALID_AUTHORIZATION_HEADER_FORMAT = "Invalid authorization header format",
}

export enum API_METHOD {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export enum AUTHENTICATION_TYPE {
  BASIC = "BASIC",
}

export enum API_ROUTES {
  REST = "/rest",
  USERS = "/users",
}
