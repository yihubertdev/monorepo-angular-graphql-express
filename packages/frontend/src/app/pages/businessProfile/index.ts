import {
  BusinessProfileResolver,
  PersonalProfileResolver,
} from "../../shared/resolvers/settings.resolver";
import { IMenu } from "sources";
import { IFullRoute } from "src/app/routes";

export const route: IFullRoute[] = [
  {
    path: "",
    redirectTo: "business-profile",
    pathMatch: "full",
    icon: "",
    description: "",
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
];

export const BUSINESS_PROFILE_SETTING_MENU: IMenu[] = route
  .filter((route) => route.path)
  .map((route) => ({
    link: route.path!,
    description: route.description,
    iconName: route.icon,
  }));
