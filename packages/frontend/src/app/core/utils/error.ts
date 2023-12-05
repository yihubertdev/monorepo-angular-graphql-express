import { ErrorHandler } from "@angular/core";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}
  showClientError(message: string): void {
    // The snackbar or dialog won't run outside the Angular's zone.
    // Wrapping it in the run method fixes this issue.
    console.log(message);
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message.substring(0, 200)}...`, "Close", {
        verticalPosition: "top",
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
  handleError(message: Error) {
    const notifier = this.notification;
    notifier.showClientError(message.message);
  }
}
