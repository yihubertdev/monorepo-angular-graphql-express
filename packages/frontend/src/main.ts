import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "./environments/environment.dev";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withPreloading,
} from "@angular/router";
import APP_ROUTES from "./app/routes";
import { MainView } from "./app/main.view";
import { BrowserStorageServiceModule } from "./app/core/services/browserStorage/browserStorage.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(MainView, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(BrowserStorageServiceModule),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
  ],
});
