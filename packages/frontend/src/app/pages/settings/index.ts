import {
  PersonalNetWorthResolver,
  SecurityResolver,
} from "../../shared/resolvers/settings.resolver";
import { importProvidersFrom } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { IMenu } from "sources-types";
import { IFullRoute } from "src/app/routes";

export const route: IFullRoute[] = [
  {
    path: "",
    redirectTo: "security",
    pathMatch: "full",
    icon: "",
    description: "",
  },
  {
    path: "security",
    description: "Security",
    icon: "verified_user",
    resolve: { settings: SecurityResolver },
    loadComponent: () => import("./security.view"),
  },
  {
    path: "profile",
    description: "Profile",
    icon: "face",
    resolve: { settings: SecurityResolver },
    loadComponent: () => import("./profile.view"),
  },
  {
    path: "personal-net-worth",
    description: "Personal Net Worth",
    icon: "monetization_on",
    providers: [
      importProvidersFrom(MatDatepickerModule),
      importProvidersFrom(MatNativeDateModule),
    ],
    resolve: { settings: PersonalNetWorthResolver },
    loadComponent: () => import("./personal-net-worth.view"),
  },
];

export const PROFILE_SETTINGS_MENU: IMenu[] = route
  .filter((route) => route.path)
  .map(
    (route) =>
      ({
        link: route.path,
        description: route.description,
        iconName: route.icon,
      } as IMenu)
  );
