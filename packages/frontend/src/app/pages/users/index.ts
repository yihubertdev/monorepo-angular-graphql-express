import {
  isUserVerified,
  replaceUserId,
} from "../../core/services/routeGuard/index.guard";
import { userProfileResolver } from "../../shared/resolvers/post.resolver";
import { IMenu } from "type-sources";
import { IFullRoute } from "../../routes";

export const profileSetting: IFullRoute[] = [
  {
    path: "personal-profile",
    description: "PERSONAL PROFILE",
    icon: "account_circle",
    canMatch: [isUserVerified],
    loadComponent: () => import("./personal-profile.view"),
    loadChildren: () =>
      import("../personalProfile").then((router) => router.route),
  },
  {
    path: "business-profile",
    description: "BUSINESS PROFILE",
    icon: "account_circle",
    canMatch: [isUserVerified],
    loadComponent: () => import("./business-profile.view"),
    loadChildren: () =>
      import("../businessProfile").then((router) => router.route),
  },
  {
    path: "network",
    description: "MY NETWORK",
    icon: "groups",
    loadComponent: () => import("./network.view"),
    loadChildren: () => import("../profile").then((router) => router.route),
  },
];

// three level menu
// {
//   profile: {
//     network: {
//       post: ""
//     },
//     setting: {
//       security: ""
//     }
//   }
// }
export const route: IFullRoute[] = [
  {
    path: "profile/:id",
    description: "NETWORK POST",
    icon: "post_add",
    canMatch: [replaceUserId],
    loadComponent: () => import("./profile.view"),
    resolve: { user: userProfileResolver },
    loadChildren: () => profileSetting,
  },
  {
    path: "financing",
    description: "FINANCING",
    icon: "paid",
    loadComponent: () => import("./financing.view"),
  },
  {
    path: "notifications",
    description: "NOTIFICATION",
    icon: "notifications",
    canActivate: [isUserVerified],
    loadComponent: () => import("./notification.view"),
  },
  {
    path: "room",
    description: "ROOM",
    icon: "groups",
    canActivate: [isUserVerified],
    loadComponent: () => import("./room.view"),
  },
];

export const DRAWER_MENU: IMenu[] = route
  .map((route) => {
    if (route.loadChildren) {
      return profileSetting.map((item) => ({
        link: "/users/profile/me/" + item.path!,
        description: item.description,
        iconName: item.icon,
      }));
    } else {
      return {
        link: "users/" + route.path!,
        description: route.description,
        iconName: route.icon,
      };
    }
  })
  .flat();
