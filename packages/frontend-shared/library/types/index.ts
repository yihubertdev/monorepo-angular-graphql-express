export const enum FIRESTORE_COLLECTION {
  users = "users",
  blogs = "blogs",
  posts = "posts",
  payment = "payment",
  article = "article",
}

export const enum INPUT_TYPE {
  TEXT = "text",
  TEXTAREA = "textarea",
  SELECT = "select",
  EMAIL = "email",
  PASSWROD = "password",
  UPLOAD = "upload",
  EDITOR = "editor",
}

export const SITE_ROUTE_PAGE = {
  ADD_ARTICLE: ["edit", "article"],
  ADD_POST: ["edit", "post"],
  HOME: ["home"],
  ARTICLES: ["home", "articles"],
  POSTS: ["home", "posts"],
  ARTICLE: ["home", "article"],
  USERS_POSTS: ["users", "_", "posts"],
  MY_POSTS: ["users", "me", "posts"],
  USERS_PROFILE: ["users", "_", "peronsal-profile"],
  My_PROFILE: ["users", "me", "peronsal-profile"],
  LOGIN: ["users", "login"],
  SIGNUP: ["users", "signup"],
  PAYMENT: ["payment"],
};

export const LOGIN_FAILED = "Email/Password wrong, please try again";
export const SIGNUP_FAILED = "Account sign up failed, please try again";
export const POP_UP_ACTION = "CLOSED";
export const POP_UP_DISMISS_DURATION = 1000;
export const POP_UP_VERTICAL_POSITION = "top";

export const enum FIREAUTH_PERSISTENCE {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
  NONE = "NONE",
}

export const enum SNACKBAR_LOCATION {
  TOP = "top",
  BOTTOM = "bottom",
  START = "start",
  CENTER = "center",
  END = "end",
  LEFT = "left",
  RIGHT = "right",
}

export const EMPTY_JSON_PARSE = "{}";

export const EMBED_YOUTUBE_URL = "https://www.youtube.com/embed/";

export const enum IUserRole {
  EDITOR = "EDITOR",
  VISITOR = "VISITOR",
  ADMIN = "ADMIN",
}

export const USER_LOGIN_ERROR = "User not login, Please Login first";
export const ADD_BLOG_ERROR = "Blog created failed.";
export const VALIDATE_VIDEO_ERROR = "Youtube video embed Id invalid";
export const ADD_ARTICLE_ERROR = "Article added successfully";

export interface IArticle {
  id?: string;
  userId: string;
  title: string;
  subTitle: string;
  description: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface IPost {
  id: string;
  userId: string;
  image?: string[];
  video?: string;
  content: string;
  displayName?: string;
  photoURL?: string;
  pin?: boolean;
  createdAt?: Date;
  updatedA?: Date;
}

export interface ICollectionQueryBuilder<T> {
  documentId: string;
  collectionId?: string;
  documentValue?: T;
  next?: ICollectionQueryBuilder<T>;
}

export interface IMenu {
  link: string | string[];
  description: string;
  iconName: string;
  width: string;
}

export interface INestedMenu extends IMenu {
  subMenu?: INestedMenu[];
}

export interface IUser {
  id: string;
  userId: string;
  displayName: string;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  role: IUserRole;
}

export interface IUserRegister {
  email: string;
  password: string;
  displayName: string;
}

export interface IUserSignUpForm extends IUserRegister {
  repeat_password: string;
}

export interface IUserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  location: string;
  email: string;
  phone: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAuth {
  uid: string;
  tenantId?: string;
  photoURL?: string;
  phonenumber?: number;
  lastLoginAt: string;
  isAnonymous: boolean;
  email: string;
  emailVerified: boolean;
  displayName: string;
  createdAt: string;
}

export interface IFormInput {
  id: string;
  type: INPUT_TYPE;
  label?: string;
  key: string;
  value: string;
  placeholder?: string;
  select?: (string | number)[];
  documentPath?: string;
  documentCategory?: string;
  error?: string;
}

export interface IPostCategoryList {
  icon: string;
  number: number;
  category: string;
}

export interface IPostList {
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  content: string;
}
