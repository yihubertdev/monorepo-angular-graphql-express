import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment.dev";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from "@angular/router";
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(MainView, {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
  ],
});
