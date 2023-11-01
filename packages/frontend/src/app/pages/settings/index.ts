import { Route, Routes } from "@angular/router";
import { settingsResolver } from "../../shared/resolvers/settings.resolver";

export interface IFullRoute extends Route {
  description: string;
  icon: string;
}

export default [
  { path: "", redirectTo: "security", pathMatch: "full" },
  {
    path: "security",
    description: "Security",
    icon: "verified_user",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./security.view"),
  },
  {
    path: "profile",
    description: "Profile",
    icon: "face",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./profile.view"),
  },
  {
    path: "personal-net-worth",
    description: "Personal Net Worth",
    icon: "monetization_on",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./personal-net-worth.view"),
  },
] as IFullRoute[];
