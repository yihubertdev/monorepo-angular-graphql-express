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
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryCache } from "@apollo/client/core";
import { GlobalMessageHandler } from "./app/core/utils/error";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GALLERY_CONFIG, GalleryConfig } from "ng-gallery";
import { LIGHTBOX_CONFIG, LightboxConfig } from "ng-gallery/lightbox";

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
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ApolloModule),
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: environment.host,
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
    importProvidersFrom(MatSnackBarModule),
    { provide: ErrorHandler, useClass: GlobalMessageHandler },
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: "cover",
      } as GalleryConfig,
    },
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
        exitAnimationTime: 1000,
      } as LightboxConfig,
    },
  ],
});
