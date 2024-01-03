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
      this.snackbar.open(`${message.substring(0, 100)}...`, "X", {
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
  handleError(message: Error) {
    console.log(message);
    const notifier = this.notification;
    switch (message.name) {
      case "SuccessMessage": {
        notifier.showSuccessMessage(message.message);
        break;
      }

      default: {
        notifier.showErrorMessage(message.message);
        break;
      }
    }
  }
}
