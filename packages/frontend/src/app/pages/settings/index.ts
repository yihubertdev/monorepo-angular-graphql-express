import {
  BusinessProfileResolver,
  PersonalNetWorthResolver,
  PersonalProfileResolver,
  PersonalResumeResolver,
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
    path: "personal-profile",
    description: "Peronsal Profile",
    icon: "face",
    resolve: { settings: PersonalProfileResolver },
    loadComponent: () => import("./personal-profile.view"),
  },
  {
    path: "personal-resume",
    description: "Peronsal Resume",
    icon: "face",
    resolve: { settings: PersonalResumeResolver },
    loadComponent: () => import("./personal-resume.view"),
  },
  {
    path: "business-profile",
    description: "Business Profile",
    icon: "person_pin_circle",
    resolve: { settings: BusinessProfileResolver },
    loadComponent: () => import("./professional-profile.view"),
  },
  {
    path: "professional-profile",
    description: "Professional Profile",
    icon: "person_pin_circle",
    resolve: { settings: PersonalProfileResolver },
    loadComponent: () => import("./professional-profile.view"),
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
  .map((route) => ({
    link: route.path!,
    description: route.description,
    iconName: route.icon,
  }));
