import { NgModule } from "@angular/core";
import { environment } from "src/environments/environment";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FireStoreServiceModule } from "./fireStore/firestore.module";
import { FireStorageServiceModule } from "./fireStorage/fire-storage.module";
import { BrowserStorageServiceModule } from "./browserStorage/browserStorage.module";
import { FireAuthServiceModule } from "./fireAuth/auth.module";

@NgModule({
  declarations: [],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    FireAuthServiceModule,
    FireStoreServiceModule,
    FireStorageServiceModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [],
})
export class ServiceModule {}
