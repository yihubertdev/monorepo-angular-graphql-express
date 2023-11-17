import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse) {
    // do something with the exception
    console.log(error);
  }
}
