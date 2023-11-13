import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "./environments/environment.dev";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
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
import { AuthService } from "./app/core/services/fireAuth/auth";
import { UserService } from "./app/core/services/fireStore/users.firestore";
import { BrowserStorageServiceModule } from "./app/core/services/browserStorage/browserStorage.module";
import {
  ArticleFireStore,
  PostFireStore,
} from "./app/core/services/fireStore/blog.firestore";
import { FormFileStorageService } from "./app/core/services/fireStorage/form-file.bucket";
import { ProfileStorageService } from "./app/core/services/fireStorage/profile.bucket";
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryCache } from "@apollo/client/core";
import { NotificationHttpService } from "./app/core/services/http/notification.http";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { PostCache } from "./app/core/services/cache/post.cache";
import { FireStoreCacheService } from "./app/core/services/cache/basic.cache";

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
      withComponentInputBinding()
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
    AuthService, //firebase auth
    UserService, //firestore user
    FormFileStorageService, // firebase document upload storage
    ProfileStorageService, // firebase profile upload storage
    ArticleFireStore, // firestore article
    PostFireStore, // firestore post
    NotificationHttpService,
    FireStoreCacheService,
    PostCache,
  ],
});
