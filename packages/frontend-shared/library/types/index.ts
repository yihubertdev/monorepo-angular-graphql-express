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

export const enum FIREAUTH_PERSISTENCE {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
  NONE = "NONE",
}

export const enum SNACKBAR_ERROR {
  USER_LOGIN_ERROR = "User not login, Please Login first",
  ADD_BLOG_ERROR = "Blog created failed.",
  VALIDATE_VIDEO_ERROR = "Youtube video embed Id invalid",
  ADD_ARTICLE_ERROR = "Article added successfully",
  LOGIN_FAILED = "Email/Password wrong, please try again",
  SIGNUP_FAILED = "Account sign up failed, please try again",
}

export const enum SNACKBAR_ACTION {
  TOP = "top",
  BOTTOM = "bottom",
  START = "start",
  CENTER = "center",
  END = "end",
  LEFT = "left",
  RIGHT = "right",
  POP_UP_ACTION = "CLOSED",
  POP_UP_DISMISS_DURATION = 1000,
}

export const EMPTY_JSON_PARSE = "{}";

export const EMBED_YOUTUBE_URL = "https://www.youtube.com/embed/";

export const enum IUserRole {
  EDITOR = "EDITOR",
  VISITOR = "VISITOR",
  ADMIN = "ADMIN",
}

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
