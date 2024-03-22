import {
  NetWorthResolver,
  PersonalNetWorthResolver,
  PersonalProfileResolver,
  PersonalResumeResolver,
  SecurityResolver,
} from "../../shared/resolvers/settings.resolver";
import { importProvidersFrom } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { IMenu } from "type-sources";
import { IFullRoute } from "../../routes";

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
    description: "Personal Profile",
    icon: "face",
    resolve: { settings: PersonalProfileResolver },
    loadComponent: () => import("./profile.view"),
  },
  {
    path: "resume",
    description: "Personal Resume",
    icon: "face",
    resolve: { settings: PersonalResumeResolver },
    loadComponent: () => import("./resume.view"),
  },
  {
    path: "net-worth",
    description: "Personal Net Worth",
    icon: "monetization_on",
    providers: [
      importProvidersFrom(MatDatepickerModule),
      importProvidersFrom(MatNativeDateModule),
    ],
    resolve: {
      settings: PersonalNetWorthResolver,
      networth: NetWorthResolver,
    },
    loadComponent: () => import("./net-worth.view"),
  },
];

export const PERSONAL_PROFILE_SETTINGS_MENU: IMenu[] = route
  .filter((route) => route.path)
  .map((route) => ({
    link: route.path!,
    description: route.description,
    iconName: route.icon,
  }));
