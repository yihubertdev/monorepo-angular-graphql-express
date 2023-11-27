import { ErrorHandler } from "@angular/core";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export class TypeMessage extends Error {
  type?: string = "test";
}
// make sure type refer to all condition the params maybe
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
  handleError(message: TypeMessage) {
    const notifier = this.notification;
    if (message.type) {
      notifier.showNonErrorSnackBar(message.message);
    } else {
      notifier.showClientError(message.message);
    }
  }
}
