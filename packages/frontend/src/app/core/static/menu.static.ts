import { IMenu, INestedMenu, ISVGIconMenu } from "sources-types";
export const SITE_ROUTE_PAGE = {
  ADD_ARTICLE: ["edit", "article"],
  ADD_POST: ["edit", "post"],
  HOME: ["home", "posts"],
  ARTICLES: ["home", "articles"],
  ARTICLE: ["home", "article"],
  USERS_POSTS: ["users", "_", "posts"],
  MY_POSTS: ["users", "me", "posts"],
  USERS_PROFILE: ["users", "_", "personal-profile"],
  My_PROFILE: ["users", "me", "personal-profile"],
  LOGIN: ["home", "login"],
  SIGNUP: ["users", "signup"],
  PAYMENT: ["payment"],
  NOTIFICATION: ["users", "notifications"],
  SETTINGS: ["users", "settings"],
  SETTINGS_SECURITY: ["security"],
  SETTINGS_PROFILE: ["profile"],
  SETTINGS_PERSONAL_NET_WORTH: ["personal-net-worth"],
};

export const footerMenus: IMenu[] = [
  {
    link: SITE_ROUTE_PAGE.HOME,
    description: "Home",
    iconName: "home",
    width: "75px",
  },
  {
    link: SITE_ROUTE_PAGE.LOGIN,
    description: "Login",
    iconName: "account_circle",
    width: "75px",
  },
  {
    link: SITE_ROUTE_PAGE.NOTIFICATION,
    description: "Notification",
    iconName: "notifications",
    width: "75px",
  },
  {
    link: "menu",
    description: "Close",
    iconName: "menu",
    width: "75px",
  },
];

export const DRAWER_MENU: IMenu[] = [
  {
    link: SITE_ROUTE_PAGE.SETTINGS,
    description: "NET WORTH",
    iconName: "paid",
    width: "50px",
  },
  {
    link: SITE_ROUTE_PAGE.SETTINGS,
    description: "FINANCING",
    iconName: "account_balance",
    width: "50px",
  },
  {
    link: SITE_ROUTE_PAGE.My_PROFILE,
    description: "NETWORK",
    iconName: "groups",
    width: "50px",
  },
  {
    link: SITE_ROUTE_PAGE.ADD_POST,
    description: "Add Post",
    iconName: "post_add",
    width: "50px",
  },
  {
    link: SITE_ROUTE_PAGE.ADD_ARTICLE,
    description: "Add Article",
    iconName: "feed",
    width: "50px",
  },
];

export const postCardMenu: IMenu[] = [
  {
    link: "delete",
    description: "Delete",
    iconName: "delete",
    width: "75px",
  },
  {
    link: "pin",
    description: "Pin",
    iconName: "push_pin",
    width: "75px",
  },
  {
    link: "edit",
    description: "Edit",
    iconName: "grid_3x3_off",
    width: "75px",
  },
];

export const addBlogMenu: IMenu[] = [
  {
    link: SITE_ROUTE_PAGE.ADD_POST,
    description: "Add Post",
    iconName: "post_add",
    width: "50px",
  },
  {
    link: SITE_ROUTE_PAGE.ADD_ARTICLE,
    description: "Add Article",
    iconName: "feed",
    width: "50px",
  },
];

export const headerMenu: INestedMenu[] = [
  {
    link: "",
    description: "Profile",
    iconName: "account_circle",
    width: "75px",
    subMenu: [
      {
        link: SITE_ROUTE_PAGE.MY_POSTS,
        description: "My Post",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: SITE_ROUTE_PAGE.My_PROFILE,
        description: "Personal Profile",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: SITE_ROUTE_PAGE.My_PROFILE,
        description: "Business Profile",
        iconName: "account_circle",
        width: "75px",
      },
    ],
  },
  {
    link: "",
    description: "Blogs",
    iconName: "account_circle",
    width: "75px",
    subMenu: [
      {
        link: "home/posts",
        description: "Short Post",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: "home/articles",
        description: "Article",
        iconName: "account_circle",
        width: "75px",
      },
    ],
  },
  {
    link: "",
    description: "Finance",
    iconName: "account_circle",
    width: "75px",
    subMenu: [
      {
        link: "home/posts",
        description: "Banker",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: "home/articles",
        description: "Valuation",
        iconName: "account_circle",
        width: "75px",
      },
    ],
  },
];

export const twitterIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`;

export const googleIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-380.2 274.7 65.7 65.8"><circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0"/><circle cx="-347.3" cy="307.1" r="32.4" fill="#fff"/><defs><path id="a" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path fill="#fbbc05" d="M-370.8 320.3v-26l17 13z" clip-path="url(#b)"/><defs><path id="c" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="d"><use overflow="visible" xlink:href="#c"/></clipPath><path fill="#ea4335" d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z" clip-path="url(#d)"/><defs><path id="e" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="f"><use overflow="visible" xlink:href="#e"/></clipPath><path fill="#34a853" d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z" clip-path="url(#f)"/><g><defs><path id="g" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="h"><use overflow="visible" xlink:href="#g"/></clipPath><path fill="#4285f4" d="M-322.8 331.3l-31-24-4-3 35-10z" clip-path="url(#h)"/></g></svg>`;

export const instagramIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102"><defs><radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#fa8f21"/><stop offset=".78" stop-color="#d82d7e"/></radialGradient><radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse"><stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"/><stop offset="1" stop-color="#8c3aaa"/></radialGradient></defs><path fill="url(#a)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361" data-name="Path 16"/><path fill="url(#b)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361" data-name="Path 17"/><path fill="#fff" d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229" data-name="Path 18" transform="translate(-422.637 -426.196)"/></svg>`;

export const linkedlnIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#0177b5"/><path fill="#fff" d="M92 32H36a4 4 0 0 0-4 4v56a4 4 0 0 0 4 4h56a4 4 0 0 0 4-4V36a4 4 0 0 0-4-4ZM52 86H42V56h10Zm-5-34a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm39 34H76V66c0-1.66-2.24-3-5-3-4 0-5 5.34-5 7v16H56V56h10v7c0-5 4.48-7 10-7a10 10 0 0 1 10 10Z"/></svg>`;

// export const HOME_MENU: ISVGIconMenu[] = [
//   {
//     link: SITE_ROUTE_PAGE.HOME,
//     description: "Home",
//     iconName: "home",
//     width: "50px",
//     src: "",
//   },
//   {
//     link: SITE_ROUTE_PAGE.LOGIN,
//     description: "Login",
//     iconName: "person",
//     width: "50px",
//     src: "",
//   },
//   {
//     link: SITE_ROUTE_PAGE.NOTIFICATION,
//     description: "Notification",
//     iconName: "x_icon",
//     width: "50px",
//     src: twitterIconSvg,
//   },
//   {
//     link: SITE_ROUTE_PAGE.NOTIFICATION,
//     description: "Notification",
//     iconName: "ins_icon",
//     width: "50px",
//     src: instagramIconSvg,
//   },
// ];
