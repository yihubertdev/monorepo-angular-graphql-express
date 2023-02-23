export enum IUserRole {
  EDITOR = "EDITOR",
  VISITOR = "VISITOR",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  userId: string;
  username: string | null;
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
  username: string;
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
  phoneNumber?: number;
  lastLoginAt: string;
  isAnonymous: boolean;
  email: string;
  emailVerified: boolean;
  displayName: string;
  createdAt: string;
}

export const USER_LOGIN_ERROR = "User not login, Please Login first";
export const ADD_BLOG_ERROR = "Blog created failed.";
export const VALIDATE_VIDEO_ERROR = "Youtube video embed Id invalid";
export const ADD_ARTICLE_ERROR = "Article added successfully";
