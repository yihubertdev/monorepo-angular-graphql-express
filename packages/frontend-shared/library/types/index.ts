export const enum FIRESTORE_COLLECTION {
  users = "users",
  blogs = "blogs",
  posts = "posts",
  payment = "payment",
  article = "article",
}

export const enum FIREAUTH_PERSISTENCE {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
  NONE = "NONE",
}

export const enum CACHE_KEY {
  HOME_PAGE = "home_page",
  USER_PAGE = "user_page",
  USER_INFO = "USER_INFO",
}

export const enum SNACKBAR_ERROR {
  USER_LOGIN_ERROR = "User not login, Please Login first",
  ADD_BLOG_ERROR = "Blog created failed.",
  VALIDATE_VIDEO_ERROR = "Youtube video embed Id invalid",
  ADD_ARTICLE_ERROR = "Article created failed",
  ADD_ARTICLE_SUCCESS = "Article created successfully",
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

export const enum EMBED_YOUTUBE {
  EMBED_YOUTUBE_URL = "https://www.youtube.com/embed/",
  EMPTY_JSON_PARSE = "{}",
}

export const enum LINK_PREVIEW {
  LINK_PREVIEW_NET_KEY = "caa011bf961ade9bcdcf3e3c822e9f04",
  LINK_PREVIEW_NET_URL = "https://api.linkpreview.net/?key=",
}

export const enum DEFAULT_CONSTANTS {
  DEFAULT_USER_PHOTO = "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/profiles%2Fprofile-CaOTPL0jHQfPAcehSVlfCcEFNAN2.png?alt=media&token=3565cc80-420f-4f22-b642-bb1885fb2982",
}

export const enum IUserRole {
  EDITOR = "EDITOR",
  VISITOR = "VISITOR",
  ADMIN = "ADMIN",
}

export const enum INPUT_TYPE {
  TEXT = "text",
  TEXTAREA = "textarea",
  SELECT = "select",
  EMAIL = "email",
  PASSWROD = "password",
  FILE = "file",
  EDITOR = "editor",
  DATE = "date",
  NUMBER = "number"
}

export const enum PROFILE_TITLE {
  PERSONAL_PROFILE = "Personal Profile",
  BUSINESS_PROFILE = "Business Profile",
  PROFESSIONAL_PROFILE = "Professional Profile",
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

export interface ILinkExtractor {
  value: string;
  links?: string[];
}

export interface ILinkPreview {
  description: string;
  image: string | null;
  title: string;
  url: string;
}

export interface IPost {
  id: string;
  userId: string;
  image?: string[];
  video?: string;
  content: string;
  displayName?: string; // user display name
  photoURL: string | null; // user photo url
  pin?: boolean;
  preview?: ILinkPreview;
  createdAt?: Date;
  updatedA?: Date;
}

export interface IPostWithLinks extends IPost {
  links: string[] | undefined;
}

export interface ICollectionQueryBuilder<T> {
  documentId?: string;
  collectionId?: string;
  documentValue?: T;
  next?: ICollectionQueryBuilder<T>;
}

export const enum SUBCOLLECTION_HANDLER {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  READ = "READ",
  DELETE = "DELETE",
}

export interface IProfileHomeAddress {
  documentId: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

export interface IFileValidation {
  name: string;
  type: string;
  size: number;
}

export const enum EMPLOYMENT_TYPE {
  SELF_EMPLOYED = "Self-employed",
  PERMANENT_FULL_TIME = "Permanent-full-time",
  PERMANENT_PART_TIME = "Permanent-part-time",
}

export const enum GEOLOCATION {
  UNKNOWN = "unknown",
}

export const enum SETTING_COLLECTION {
  SECURITY = "security",
  PERSONAL_PROFILE = "personal_profile",
  PROFESSIONAL_PROFILE = "professional_profile",
  PERSONAL_NET_WORTH = "personal_net_worth",
  PERSONAL_RESUME = "personal_resume",
  BUSINESS_PROFILE = "business_profile"
}

export const enum PROFILE_TYPE {
  PERSONAL = "Personal Profile",
  BUSINESS = "Personal Profile",
  PROFESSIONAL = "Professional Profile",
}

export const enum SETTING_CATEGORY {
  ACCOUNT = "account",
  AUTHENTICATION = "authentication",
  RECOGNITION = "recognition",
  CASH_ACCOUNTS_RECEIVABLE = "cash_accounts_receivable",
  MARKABLE_SECURITY = "markable_securities",
  TAX_SHELTERED_INVESTMENT = "tax_sheltered_investment",
  INSURANCE = "insurance",
  REAL_ESTATE = "real_estate",
  VEHICLES = "vehicles",
  TAX_RETURN = "tax_return",
  NOTICE_OF_ASSESSMENT = "notice_of_assessment",
  HOME_ADDRESS = "home_address",
  BIOGRAPHY = "biography",
}

export const enum FILE_TYPE {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  PNG = "image/png",
  GIF = "image/gif",
}

export interface IProfileEducation {
  title: string;
  institution: string;
  degree: string;
  year: string;
  type: EMPLOYMENT_TYPE;
}

export interface IProfile {
  homeAddress?: IProfileHomeAddress[];
  education?: IProfileEducation[];
}

export interface IMenu {
  link: string | string[];
  description: string;
  iconName: string;
  width?: string;
}

export interface ISVGIconMenu extends IMenu {
  src: string;
}

export interface INestedMenu extends IMenu {
  subMenu?: INestedMenu[];
}

export interface IUser {
  userId: string;
  displayName: string;
  photoURL: string | null;
  description: string | null;
  backgroundPhotoURL: string | null;
  role: IUserRole;
}

export interface IUserFull extends IUser {
  uid: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  displayName: string;
}

export interface IUserSignUpForm extends IUserRegister {
  repeatPassword: string;
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
  key: string;
  label: string;
  hint: Readonly<string>;
  icon: Readonly<string>;
  column: IColumnSet;
  disabled?: boolean;
  error?: string;
}

export interface ITextFormInput extends IFormInput {
  type: Exclude<INPUT_TYPE, INPUT_TYPE.FILE | INPUT_TYPE.SELECT | INPUT_TYPE.NUMBER>;
  value: string;
}

export interface INumberFormInput extends IFormInput {
  type: INPUT_TYPE.NUMBER;
  value: number;
}

export interface ISelectFormInput extends IFormInput {
  type: INPUT_TYPE.SELECT;
  value: string[];
  selection: (string | number)[];
}

export interface IColumnSet {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
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
