import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "./environments/environment.dev";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from "@angular/router";
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { BrowserStorageServiceModule } from "./app/core/services/browserStorage/browserStorage.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import {
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { AuthService } from "./app/core/services/fireAuth/auth";
import { UserService } from "./app/core/services/fireStore/users.firestore";
import {
  ArticleFireStore,
  PostFireStore,
} from "./app/core/services/fireStore/blog.firestore";
import { FormFileStorageService } from "./app/core/services/fireStorage/form-file.bucket";
import { ProfileStorageService } from "./app/core/services/fireStorage/profile.bucket";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(MainView, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(BrowserStorageServiceModule),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(
      provideFirestore(() =>
        initializeFirestore(getFirestore().app, {
          cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        })
      )
    ),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    AuthService, //firebase auth
    UserService, //firestore user
    FormFileStorageService, // firebase document upload storage
    ProfileStorageService, // firebase profile upload storage
    ArticleFireStore, // firestore article
    PostFireStore, // firestore post
  ],
});
