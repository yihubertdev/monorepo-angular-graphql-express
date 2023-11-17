import {
  ErrorHandler,
  enableProdMode,
  importProvidersFrom,
} from "@angular/core";
import { environment } from "./environments/environment.dev";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  InMemoryScrollingOptions,
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { initializeApp, provideFirebaseApp, getApp } from "@angular/fire/app";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  provideFirestore,
} from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { provideMessaging, getMessaging } from "@angular/fire/messaging";
import { BrowserStorageServiceModule } from "./app/core/services/browserStorage/browserStorage.module";
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryCache } from "@apollo/client/core";
import { GlobalErrorHandler } from "./app/core/utils/error";

if (environment.production) {
  enableProdMode();
}

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
};

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
        initializeFirestore(getApp(), {
          cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        })
      )
    ),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling(scrollConfig)
    ),
    // angular apollo
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.host,
          }),
        };
      },
      deps: [HttpLink],
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
});
