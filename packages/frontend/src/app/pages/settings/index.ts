import { Routes } from "@angular/router";
import { settingsResolver } from "../../shared/resolvers/settings.resolver";

export default [
  { path: "", redirectTo: "security", pathMatch: "full" },
  {
    path: "security",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./security.view"),
  },
  {
    path: "profile",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./profile.view"),
  },
] as Routes;
