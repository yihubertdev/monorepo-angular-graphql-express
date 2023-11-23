import { ErrorHandler, Injector, inject } from "@angular/core";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export class TypeMessage extends Error {
  type: string = "test";
}

export class Success extends TypeMessage {
  override type = "success";
}
@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}
  showClientError(message: string): void {
    // The snackbar or dialog won't run outside the Angular's zone.
    // Wrapping it in the run method fixes this issue.
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message}`, "Okay", {
        panelClass: ["red-color"], // add a class to snackbar to add custom styles
      });
    });
  }

  showNonErrorSnackBar(message: string) {
    this.snackbar.open(message, "Okay", {
      duration: 2000,
      verticalPosition: "top",
    });
  }
}

@Injectable({
  providedIn: "root",
})
export class GlobalMessageHandler implements ErrorHandler {
  constructor(private notification: NotificationService) {}
  handleError(message: TypeMessage) {
    const notifier = this.notification;
    // do something with the exception
    console.log(message.type);
    notifier.showNonErrorSnackBar(message.message);
  }
}
