import {
  EMPLOYMENT_TYPE,
  IFormInput,
  INPUT_TYPE,
  ITab,
  ITabPanel,
  PROFILE_TYPE,
  SETTING_CATEGORY,
  SETTING_COLLECTION,
} from "sources-types";
import { JoiSchemaBuilder, SETTING_FORM } from "../utils/validator";
import {
  PERSONAL_DOCUMENT_SCHEMA,
  TAX_RETURN_FILE_SCHEMA,
  homeAdressSchema,
} from "../joiSchema/auth.schema";

export const yourAccountFormList: IFormInput[] = [
  {
    id: "displayName",
    type: INPUT_TYPE.TEXT,
    label: "Your Profile Name",
    key: "displayName",
    value: "",
    placeholder: "Edit your display name",
  },
  {
    id: "location",
    type: INPUT_TYPE.TEXT,
    label: "Your location",
    key: "location",
    value: "",
    placeholder: "Edit your location",
  },
  {
    id: "email",
    type: INPUT_TYPE.TEXT,
    label: "Email",
    key: "email",
    value: "",
    placeholder: "Edit your email",
  },
  {
    id: "phone",
    type: INPUT_TYPE.TEXT,
    label: "Your phone",
    key: "phone",
    value: "",
    placeholder: "Edit phone",
  },
  {
    id: "image",
    type: INPUT_TYPE.UPLOAD,
    label: "Your Image",
    key: "image",
    value: "",
    placeholder: "Edit image",
    documentPath: "postImage",
    documentCategory: "blog",
  },
];

export const userLoginFormList: IFormInput[] = [
  {
    id: "email",
    type: INPUT_TYPE.EMAIL,
    label: "Your Email",
    key: "email",
    value: "",
    placeholder: "Enter Email",
  },
  {
    id: "password",
    type: INPUT_TYPE.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    placeholder: "Enter Password",
  },
];

export const userSignUpFormList: IFormInput[] = [
  {
    id: "displayName",
    type: INPUT_TYPE.TEXT,
    label: "Your Display Name",
    key: "displayName",
    value: "",
    placeholder: "Edit Name",
    error: "",
  },
  {
    id: "email",
    type: INPUT_TYPE.EMAIL,
    label: "Your Email",
    key: "email",
    value: "",
    placeholder: "Enter Email",
    error: "",
  },
  {
    id: "password",
    type: INPUT_TYPE.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    placeholder: "Enter Password",
    error: "",
  },
  {
    id: "repeatPassword",
    type: INPUT_TYPE.PASSWROD,
    label: "Repeat your Password",
    key: "repeatPassword",
    value: "",
    placeholder: "Repeat password",
    error: "",
  },
];

export const HOME_ADDRESS_PROFILE: IFormInput[] = [
  {
    id: "address_line_1",
    type: INPUT_TYPE.TEXT,
    label: "Address Line 1*",
    key: "address_line_1",
    value: "",
    placeholder: "",
  },
  {
    id: "address_line_2",
    type: INPUT_TYPE.TEXT,
    label: "Address Line 2",
    key: "address_line_2",
    value: "",
    placeholder: "",
  },
  {
    id: "city",
    type: INPUT_TYPE.TEXT,
    label: "City*",
    key: "city",
    value: "",
    placeholder: "",
  },
  {
    id: "postal_code",
    type: INPUT_TYPE.TEXT,
    label: "Postal Code",
    key: "postal_code",
    value: "",
    placeholder: "",
  },
  {
    id: "province",
    type: INPUT_TYPE.SELECT,
    label: "Select Province",
    key: "province",
    value: [] as any,
    placeholder: "",
    selection: ["Ontario"],
  },
  {
    id: "province",
    type: INPUT_TYPE.SELECT,
    label: "Select Province",
    key: "province",
    value: [] as any,
    placeholder: "",
    selection: ["Ontario"],
  },
];

export const ACCOUNT_INFO: IFormInput[] = [
  {
    id: "displayName",
    type: INPUT_TYPE.TEXT,
    label: "Display Name",
    key: "displayName",
    value: "",
    placeholder: "",
  },
  {
    id: "userId",
    type: INPUT_TYPE.TEXT,
    label: "User Id",
    key: "userId",
    value: "",
    placeholder: "",
  },
  {
    id: "email",
    type: INPUT_TYPE.TEXT,
    label: "Email",
    key: "email",
    value: "",
    placeholder: "",
  },
  {
    id: "emailVerified",
    type: INPUT_TYPE.TEXT,
    label: "Email Verified",
    key: "emailVerified",
    value: "",
    placeholder: "",
  },
  {
    id: "isAnonymous",
    type: INPUT_TYPE.TEXT,
    label: "Registed",
    key: "isAnonymous",
    value: "",
    placeholder: "",
  },
  {
    id: "phoneNumber",
    type: INPUT_TYPE.TEXT,
    label: "Phone Number",
    key: "phoneNumber",
    value: "",
    placeholder: "",
  },
  {
    id: "role",
    type: INPUT_TYPE.TEXT,
    label: "Role",
    key: "role",
    value: "",
    placeholder: "",
  },
];

export interface IFormUploaderInput extends IFormInput {
  schema?: JoiSchemaBuilder<any>;
}

export const TAX_RETURN_FORM: IFormUploaderInput[] = Array(3)
  .fill(0)
  .map((item, index) => {
    const currentYear = new Date().getFullYear();

    return {
      id: "taxReturn_" + (currentYear - index),
      type: INPUT_TYPE.UPLOAD,
      label: "Tax Return " + (currentYear - index),
      key: "taxReturn_" + (currentYear - index),
      value: "",
      placeholder: "",
      required: true,
      documentPath: "net_worth",
      documentCategory: "tax_return",
      schema: TAX_RETURN_FILE_SCHEMA,
    };
  });

export const SECURITY_PANEL: ITabPanel[] = [
  {
    title: "Account",
    description: "User Basic Information",
    category: SETTING_CATEGORY.ACCOUNT,
  },
  {
    title: "Authentication",
    description: "Change Password",
    category: "authentication",
  },
  {
    title: "Recognition",
    description: "Change facial and voice recognition",
    category: "recognition",
  },
];

export const PERSONAL_PROFILE_PANEL: ITabPanel[] = [
  {
    title: "Home Address",
    description: "User Basic Information",
    category: "home_address",
  },
  {
    title: "Authentication",
    description: "Change Password",
    category: "authentication",
  },
  {
    title: "Recognition",
    description: "Change facial and voice recognition",
    category: "recognition",
  },
];

export const PERSONAL_NET_WORTH: ITabPanel[] = [
  {
    title: "Tax Return",
    description: "Personal tax return for the last three years",
    category: SETTING_CATEGORY.TAX_RETURN,
  },
  {
    title: "Notice Of Assessment",
    description: "Personal Notice Of Assessment for the last three years",
    category: SETTING_CATEGORY.NOTICE_OF_ASSESSMENT,
  },
  {
    title: "Cash And Accounts Receivable",
    description: "asset type, financial institution, statement.",
    category: SETTING_CATEGORY.CASH_ACCOUNTS_RECEIVABLE,
  },
  {
    title: "Markable Securities",
    description: "Change facial and voice recognition",
    category: SETTING_CATEGORY.MARKABLE_SECURITY,
  },
  {
    title: "Tax Sheltered Investment",
    description: "Tax sheltered investment",
    category: SETTING_CATEGORY.TAX_SHELTERED_INVESTMENT,
  },
  {
    title: "Insurance",
    description: "Insurance",
    category: SETTING_CATEGORY.INSURANCE,
  },
  {
    title: "Real Estate",
    description: "Real Estate Property",
    category: SETTING_CATEGORY.REAL_ESTATE,
  },
  {
    title: "Vehicles",
    description: "Personal Vehicles",
    category: SETTING_CATEGORY.VEHICLES,
  },
];

export const SETTINGS_FORM_CONFIG: Record<string, SETTING_FORM<any>> = {
  [SETTING_CATEGORY.ACCOUNT]: {
    list: ACCOUNT_INFO,
  },
  [SETTING_CATEGORY.TAX_RETURN]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.AUTHENTICATION]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.RECOGNITION]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.NOTICE_OF_ASSESSMENT]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.CASH_ACCOUNTS_RECEIVABLE]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.MARKABLE_SECURITY]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.TAX_SHELTERED_INVESTMENT]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.INSURANCE]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.VEHICLES]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
  [SETTING_CATEGORY.REAL_ESTATE]: {
    list: TAX_RETURN_FORM,
    schema: PERSONAL_DOCUMENT_SCHEMA,
  },
};

export const SETTINGS: Record<string, ITabPanel[] | ITab[]> = {
  [SETTING_COLLECTION.SECURITY]: SECURITY_PANEL,
  [SETTING_COLLECTION.PROFILE]: [
    {
      title: PROFILE_TYPE.PERSONAL,
      panel: PERSONAL_PROFILE_PANEL,
    },
    {
      title: PROFILE_TYPE.BUSINESS,
      panel: PERSONAL_PROFILE_PANEL,
    },
    {
      title: PROFILE_TYPE.PROFESSIONAL,
      panel: PERSONAL_PROFILE_PANEL,
    },
  ],
  [SETTING_COLLECTION.PERSONAL_NET_WORTH]: PERSONAL_NET_WORTH,
};

export const EMPLOYMENT: IFormInput[] = [
  {
    id: "title",
    type: INPUT_TYPE.TEXT,
    label: "Most Recent Job Title",
    key: "title",
    value: "",
    placeholder: "",
  },
  {
    id: "institution",
    type: INPUT_TYPE.TEXT,
    label: "Most Recent Company",
    key: "institution",
    value: "",
    placeholder: "",
  },
  {
    id: "degree",
    type: INPUT_TYPE.TEXT,
    label: "Degree",
    key: "degree",
    value: "",
    placeholder: "",
  },
  {
    id: "year",
    type: INPUT_TYPE.TEXT,
    label: "Year",
    key: "year",
    value: "",
    placeholder: "",
  },
  {
    id: "employment_type",
    type: INPUT_TYPE.SELECT,
    label: "Employment type",
    key: "employment_type",
    value: "",
    placeholder: "",
    selection: [EMPLOYMENT_TYPE.PERMANENT_FULL_TIME],
  },
];

export interface IFormStepper {
  label: string;
  title: string;
  subTitle: string;
  formInput: IFormInput[];
  formValidate: JoiSchemaBuilder<any>;
}

export type IStepper = IFormStepper[];
