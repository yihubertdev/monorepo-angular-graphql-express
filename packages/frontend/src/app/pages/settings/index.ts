import { Routes } from "@angular/router";
import { isUserLogin } from "../../core/services/routeGuard/index.guard";
import { postByUserResolver } from "../../shared/resolvers/post.resolver";
import { settingsResolver } from "../../shared/resolvers/settings.resolver";

export default [
  { path: "", redirectTo: "security", pathMatch: "full" },
  {
    path: "security",
    resolve: { settings: settingsResolver },
    loadComponent: () => import("./security.view"),
  },
] as Routes;
