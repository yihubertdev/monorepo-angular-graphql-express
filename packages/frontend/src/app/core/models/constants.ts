export enum InputType {
  TEXT = "text",
  TEXTAREA = "textarea",
  SELECT = "select",
  EMAIL = "email",
  PASSWROD = "password",
  UPLOAD = "upload",
  EDITOR = "editor",
}

export enum FIRESTORE_COLLECTION {
  users = "users",
  blogs = "blogs",
  posts = "posts",
  payment = "payment",
  article = "article",
}

export const LOGIN_FAILED = "Email/Password wrong, please try again";
export const SIGNUP_FAILED = "Account sign up failed, please try again";
export const POP_UP_ACTION = "CLOSED";
export const POP_UP_DISMISS_DURATION = 1000;
export const POP_UP_VERTICAL_POSITION = "top";

export enum FIRESTORE_AUTH_PERSISTENCE {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
  NONE = "NONE",
}

export const EMPTY_JSON_PARSE = "{}";

export const EMBED_YOUTUBE_URL = "https://www.youtube.com/embed/";
