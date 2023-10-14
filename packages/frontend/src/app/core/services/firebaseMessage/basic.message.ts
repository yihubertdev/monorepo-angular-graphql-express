import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.dev";
import { Messaging, getToken, onMessage } from "@angular/fire/messaging";

@Injectable({
  providedIn: "root",
})
export class FirebaseMessagingService {
  constructor(protected messaging: Messaging) {}

  public async requestToken(): Promise<void> {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebaseConfig.vapidKey,
      });
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }

  public getMessaging() {
    onMessage(this.messaging, (payload) => {
      console.log(payload);
    });
  }
}
