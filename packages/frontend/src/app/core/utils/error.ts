import { ErrorHandler } from "@angular/core";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export class SuccessMessage extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SuccessMessage";
  }
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(
    private snackbar: MatSnackBar,
    private zone: NgZone
  ) {}
  showErrorMessage(message: string): void {
    // The snackbar or dialog won't run outside the Angular's zone.
    // Wrapping it in the run method fixes this issue.
    this.zone.run(() => {
      this.snackbar.open(`${message.substring(0, 100)}`, "X", {
        verticalPosition: "top",
        panelClass: ["red-snackbar"],
      });
    });
  }

  showSuccessMessage(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["green-snackbar"],
    });
  }
}

@Injectable({
  providedIn: "root",
})
export class GlobalMessageHandler implements ErrorHandler {
  constructor(private notification: NotificationService) {}
  private _clearUnusedMessage(message: string) {
    ["Error", "firebase:", "Firebase:"].forEach(
      (item) => (message = message.replace(item, ""))
    );

    return message;
  }

  handleError(error: Error) {
    const notifier = this.notification;
    switch (error.name) {
      case "SuccessMessage": {
        notifier.showSuccessMessage(this._clearUnusedMessage(error.message));
        break;
      }

      default: {
        notifier.showErrorMessage(this._clearUnusedMessage(error.message));
        break;
      }
    }
  }
}
