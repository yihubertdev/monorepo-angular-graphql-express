import { IMenu, INestedMenu, SITE_ROUTE_PAGE } from "sources-types";

export const footerMenus: IMenu[] = [
  {
    link: SITE_ROUTE_PAGE.POSTS,
    description: "Posts",
    iconName: "feed",
    width: "75px",
  },
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
    link: "payment",
    description: "Donation",
    iconName: "credit_card",
    width: "75px",
  },
  {
    link: "menu",
    description: "Menu",
    iconName: "menu",
    width: "75px",
  },
];

export const homePageMenus: IMenu[] = [
  {
    link: SITE_ROUTE_PAGE.POSTS,
    description: "Posts",
    iconName: "feed",
    width: "75px",
  },
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
    link: SITE_ROUTE_PAGE.PAYMENT,
    description: "Donation",
    iconName: "credit_card",
    width: "75px",
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
    link: ["/users", "login"],
    description: "Login",
    iconName: "account_circle",
    width: "75px",
  },
  {
    link: ["/users", "signup"],
    description: "Sign Up",
    iconName: "account_circle",
    width: "75px",
  },
  {
    link: "",
    description: "Account",
    iconName: "account_circle",
    width: "75px",
    subMenu: [
      {
        link: ["/users", "users", "me", "posts"],
        description: "My Post",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: ["/users", "users", "me", "personal-profile"],
        description: "Personal Profile",
        iconName: "account_circle",
        width: "75px",
      },
      {
        link: "",
        description: "Business Profile",
        iconName: "account_circle",
        width: "75px",
      },
    ],
  },
  {
    link: "",
    description: "Home",
    iconName: "account_circle",
    width: "75px",
    subMenu: [
      {
        link: "home",
        description: "Main",
        iconName: "account_circle",
        width: "75px",
      },
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
