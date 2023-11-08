import {
  EMPLOYMENT_TYPE,
  FILE_TYPE,
  IFormInput,
  INPUT_TYPE,
  PROFILE_TYPE,
  SETTING_CATEGORY,
  SETTING_COLLECTION,
  SETTING_COLLECTIONTAB,
} from "sources-types";
import { JoiSchemaBuilder } from "../utils/validator";
import {
  PDF_FILE_SCHEMA,
  SETTINGS_SCHEMA_GENERATOR,
} from "../joiSchema/auth.schema";
import * as Joi from "joi";

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
  schema?: Joi.ObjectSchema | Joi.ArraySchema;
}

export const CASH_ACCOUNTS_RECEIVABLE_FORM: IFormUploaderInput[] = [
  {
    id: "assetType",
    type: INPUT_TYPE.SELECT,
    label: "Asset Type",
    key: "assetType",
    value: "",
    placeholder: "",
    selection: ["Cash", "Account Receivable", "Other Liquid Asset"],
  },
  {
    id: "financialInstitution",
    type: INPUT_TYPE.SELECT,
    label: "Financial Institution",
    key: "financialInstitution",
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "currentBalance",
    type: INPUT_TYPE.TEXT,
    label: "Current Balance",
    key: "currentBalance",
    value: "",
    placeholder: "",
  },
  {
    id: "lastStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Statement",
    key: "lastStatement",
    value: "",
    placeholder: "",
    documentPath: "net_worth",
    documentCategory: "noticeOfAssessment",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Notice Of Assessment",
      size: 5242880,
    }),
  },
];

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
      schema: PDF_FILE_SCHEMA({
        type: [FILE_TYPE.PDF],
        name: "Notice Of Assessment",
        size: 5242880,
      }),
    };
  });

export const HOME_ADDRESS_FORM: IFormUploaderInput[] = [
  {
    id: "addressLine1",
    type: INPUT_TYPE.TEXT,
    label: "Address Line 1",
    key: "addressLine1",
    value: "",
    placeholder: "",
  },
  {
    id: "addressLine2",
    type: INPUT_TYPE.TEXT,
    label: "Address Line 2",
    key: "addressLine2",
    value: "",
    placeholder: "",
  },
  {
    id: "city",
    type: INPUT_TYPE.TEXT,
    label: "Current Balance",
    key: "currentBalance",
    value: "",
    placeholder: "",
  },
  {
    id: "postalCode",
    type: INPUT_TYPE.TEXT,
    label: "Postal Code",
    key: "postalCode",
    value: "",
    placeholder: "",
  },
  {
    id: "province",
    type: INPUT_TYPE.SELECT,
    label: "Province",
    key: "province",
    value: "",
    placeholder: "",
    selection: ["Ontario"],
  },
  {
    id: "country",
    type: INPUT_TYPE.SELECT,
    label: "Country",
    key: "country",
    value: "",
    placeholder: "",
    selection: ["Canada"],
  },
];

export const MARKABLE_SECURITY_FORM: IFormUploaderInput[] = [
  {
    id: "financialInstitution",
    type: INPUT_TYPE.SELECT,
    label: "Financial Institution",
    key: "financialInstitution",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "inNameOf",
    type: INPUT_TYPE.TEXT,
    label: "In Name Of",
    key: "inNameOf",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "pledgeAsCollateral",
    type: INPUT_TYPE.TEXT,
    label: "Pledge As Collateral",
    key: "pledgeAsCollateral",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "highestAssetAllocation",
    type: INPUT_TYPE.SELECT,
    label: "Highest Asset Allocation",
    key: "highestAssetAllocation",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "marketValue",
    type: INPUT_TYPE.TEXT,
    label: "Market Value",
    key: "marketValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lender",
    type: INPUT_TYPE.SELECT,
    label: "Lender",
    key: "lender",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "loanBalance",
    type: INPUT_TYPE.TEXT,
    label: "Loan Balance",
    key: "loanBalance",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyPayment",
    type: INPUT_TYPE.TEXT,
    label: "Month Payment",
    key: "monthlyPayment",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lastSecurityStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Security Statement",
    key: "lastSecurityStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastSecurityStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Security Statement",
      size: 5242880,
    }),
  },
  {
    id: "lastLoanStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Loan Statement",
    key: "lastLoanStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastLoanStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Loan Statement",
      size: 5242880,
    }),
  },
];

export const TAX_SHELTERED_INVESTMENT_FORM: IFormUploaderInput[] = [
  {
    id: "financialInstitution",
    type: INPUT_TYPE.SELECT,
    label: "Financial Institution",
    key: "financialInstitution",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "inNameOf",
    type: INPUT_TYPE.TEXT,
    label: "In Name Of",
    key: "inNameOf",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "pledgeAsCollateral",
    type: INPUT_TYPE.TEXT,
    label: "Pledge As Collateral",
    key: "pledgeAsCollateral",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "description",
    type: INPUT_TYPE.SELECT,
    label: "Description",
    key: "description",
    required: true,
    value: "",
    placeholder: "",
    selection: ["RRSP", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "marketValue",
    type: INPUT_TYPE.TEXT,
    label: "Market Value",
    key: "marketValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyIncome",
    type: INPUT_TYPE.TEXT,
    label: "Monthly Income",
    key: "monthlyIncome",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lender",
    type: INPUT_TYPE.SELECT,
    label: "Lender",
    key: "lender",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "loanBalance",
    type: INPUT_TYPE.TEXT,
    label: "Loan Balance",
    key: "loanBalance",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyPayment",
    type: INPUT_TYPE.TEXT,
    label: "Month Payment",
    key: "monthlyPayment",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lastSecurityStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Security Statement",
    key: "lastSecurityStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastSecurityStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Security Statement",
      size: 5242880,
    }),
  },
  {
    id: "lastLoanStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Loan Statement",
    key: "lastLoanStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastLoanStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Loan Statement",
      size: 5242880,
    }),
  },
];

export const INSURANCE_FORM: IFormUploaderInput[] = [
  {
    id: "insuranceCompany",
    type: INPUT_TYPE.TEXT,
    label: "Insurance",
    key: "insuranceCompany",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "beneficiary",
    type: INPUT_TYPE.TEXT,
    label: "Beneficiary",
    key: "beneficiary",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "type",
    type: INPUT_TYPE.SELECT,
    label: "Type",
    key: "type",
    required: true,
    value: "",
    placeholder: "",
    selection: ["RRSP", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "faceValue",
    type: INPUT_TYPE.TEXT,
    label: "faceValue",
    key: "faceValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyPremium",
    type: INPUT_TYPE.TEXT,
    label: "Monthly Premium",
    key: "monthlyPremium",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "cashSurrenderValue",
    type: INPUT_TYPE.TEXT,
    label: "Cash Surrender Value",
    key: "cashSurrenderValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lender",
    type: INPUT_TYPE.SELECT,
    label: "Lender",
    key: "lender",
    required: true,
    value: "",
    placeholder: "",
    selection: ["BMO", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "policyLoans",
    type: INPUT_TYPE.TEXT,
    label: "Policy Loans",
    key: "policyLoans",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyPayment",
    type: INPUT_TYPE.TEXT,
    label: "Month Payment",
    key: "monthlyPayment",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lastSecurityStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Security Statement",
    key: "lastSecurityStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastSecurityStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Security Statement",
      size: 5242880,
    }),
  },
  {
    id: "lastLoanStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Loan Statement",
    key: "lastLoanStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastLoanStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Loan Statement",
      size: 5242880,
    }),
  },
];

export const REAL_ESTATE_FORM: IFormUploaderInput[] = [
  {
    id: "typeOfResidence",
    type: INPUT_TYPE.SELECT,
    label: "Type Of Residence",
    key: "typeOfResidence",
    required: true,
    value: "",
    placeholder: "",
    selection: ["RRSP", "CIBC", "RBC", "SCOTIA", "TD", "OTHER"],
  },
  {
    id: "titleInNameOf",
    type: INPUT_TYPE.TEXT,
    label: "Title In Name Of",
    key: "titleInNameOf",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "ownership",
    type: INPUT_TYPE.TEXT,
    label: "Title In Name Of",
    key: "ownership",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "dateAcquired",
    type: INPUT_TYPE.TEXT,
    label: "Date Acquired",
    key: "dateAcquired",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "addressLine1",
    type: INPUT_TYPE.TEXT,
    label: "Address Line 1",
    key: "addressLine1",
    value: "",
    placeholder: "",
  },
  {
    id: "city",
    type: INPUT_TYPE.TEXT,
    label: "Current Balance",
    key: "currentBalance",
    value: "",
    placeholder: "",
  },
  {
    id: "postalCode",
    type: INPUT_TYPE.TEXT,
    label: "Postal Code",
    key: "postalCode",
    value: "",
    placeholder: "",
  },
  {
    id: "province",
    type: INPUT_TYPE.SELECT,
    label: "Province",
    key: "province",
    value: "",
    placeholder: "",
    selection: ["Ontario"],
  },
  {
    id: "country",
    type: INPUT_TYPE.SELECT,
    label: "Country",
    key: "country",
    value: "",
    placeholder: "",
    selection: ["Canada"],
  },
  {
    id: "purchasePrice",
    type: INPUT_TYPE.TEXT,
    label: "Purchase Price",
    key: "purchasePrice",
    value: "",
    placeholder: "",
  },
  {
    id: "marketValue",
    type: INPUT_TYPE.TEXT,
    label: "Market Value",
    key: "marketValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "grossIncome",
    type: INPUT_TYPE.TEXT,
    label: "Gross Income",
    key: "grossIncome",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "mainCondoFees",
    type: INPUT_TYPE.TEXT,
    label: "Main Condo Fees",
    key: "mainCondoFees",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "monthlyInsurance",
    type: INPUT_TYPE.TEXT,
    label: "Monthly Insurance",
    key: "monthlyInsurance",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "cashSurrenderValue",
    type: INPUT_TYPE.TEXT,
    label: "Cash Surrender Value",
    key: "cashSurrenderValue",
    required: true,
    value: "",
    placeholder: "",
  },
  {
    id: "lastSecurityStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Security Statement",
    key: "lastSecurityStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastSecurityStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Security Statement",
      size: 5242880,
    }),
  },
  {
    id: "lastLoanStatement",
    type: INPUT_TYPE.UPLOAD,
    label: "Last Loan Statement",
    key: "lastLoanStatement",
    value: "",
    placeholder: "",
    required: true,
    documentPath: "net_worth",
    documentCategory: "lastLoanStatement",
    schema: PDF_FILE_SCHEMA({
      type: [FILE_TYPE.PDF],
      name: "Last Loan Statement",
      size: 5242880,
    }),
  },
];

export const NOTICE_OF_ASSESSMENT_FORM: IFormUploaderInput[] = Array(3)
  .fill(0)
  .map((item, index) => {
    const currentYear = new Date().getFullYear();

    return {
      id: "noticeOfAssessment_" + (currentYear - index),
      type: INPUT_TYPE.UPLOAD,
      label: "Notice Of Assessment " + (currentYear - index),
      key: "noticeOfAssessment_" + (currentYear - index),
      value: "",
      placeholder: "",
      required: true,
      documentPath: "net_worth",
      documentCategory: "noticeOfAssessment",
      schema: PDF_FILE_SCHEMA({
        type: [FILE_TYPE.PDF],
        name: "Notice Of Assessment",
        size: 5242880,
      }),
    };
  });

export interface ISettingCategory {
  title: string;
  description: string;
  category: string;
  list: IFormUploaderInput[];
  schema?: JoiSchemaBuilder<any>;
}

export interface ISettingCategoryTab {
  title: string;
  categories: ISettingCategory[];
}

export const SETTING_COLLECTION_TAB: Record<
  SETTING_COLLECTIONTAB,
  ISettingCategoryTab[]
> = {
  [SETTING_COLLECTIONTAB.PROFILE]: [
    {
      title: PROFILE_TYPE.PERSONAL,
      categories: [
        {
          title: "Home Address",
          description: "User Basic Information",
          category: "home_address",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Authentication",
          description: "Change Password",
          category: "authentication",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Recognition",
          description: "Change facial and voice recognition",
          category: "recognition",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
      ],
    },
    {
      title: PROFILE_TYPE.BUSINESS,
      categories: [
        {
          title: "Home Address",
          description: "User Basic Information",
          category: "home_address",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Authentication",
          description: "Change Password",
          category: "authentication",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Recognition",
          description: "Change facial and voice recognition",
          category: "recognition",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
      ],
    },
    {
      title: PROFILE_TYPE.PROFESSIONAL,
      categories: [
        {
          title: "Home Address",
          description: "User Basic Information",
          category: "home_address",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Authentication",
          description: "Change Password",
          category: "authentication",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
        {
          title: "Recognition",
          description: "Change facial and voice recognition",
          category: "recognition",
          list: HOME_ADDRESS_FORM,
          schema: (data: any): Joi.ObjectSchema =>
            SETTINGS_SCHEMA_GENERATOR(HOME_ADDRESS_FORM),
        },
      ],
    },
  ],
};

export const SETTING_COLLECTIONS: Record<
  SETTING_COLLECTION,
  ISettingCategory[]
> = {
  [SETTING_COLLECTION.SECURITY]: [
    {
      title: "Account",
      description: "User Basic Information",
      category: SETTING_CATEGORY.ACCOUNT,
      list: ACCOUNT_INFO,
    },
    {
      title: "Authentication",
      description: "Change Password",
      category: "authentication",
      list: ACCOUNT_INFO,
    },
    {
      title: "Recognition",
      description: "Change facial and voice recognition",
      category: "recognition",
      list: ACCOUNT_INFO,
    },
  ],
  [SETTING_COLLECTION.PERSONAL_NET_WORTH]: [
    {
      title: "Tax Return",
      description: "Personal tax return for the last three years",
      category: SETTING_CATEGORY.TAX_RETURN,
      list: TAX_RETURN_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(TAX_RETURN_FORM),
    },
    {
      title: "Notice Of Assessment",
      description: "Personal Notice Of Assessment for the last three years",
      category: SETTING_CATEGORY.NOTICE_OF_ASSESSMENT,
      list: NOTICE_OF_ASSESSMENT_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(NOTICE_OF_ASSESSMENT_FORM),
    },
    {
      title: "Cash And Accounts Receivable",
      description: "asset type, financial institution, statement.",
      category: SETTING_CATEGORY.CASH_ACCOUNTS_RECEIVABLE,
      list: CASH_ACCOUNTS_RECEIVABLE_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(CASH_ACCOUNTS_RECEIVABLE_FORM),
    },
    {
      title: "Markable Securities",
      description: "Change facial and voice recognition",
      category: SETTING_CATEGORY.MARKABLE_SECURITY,
      list: MARKABLE_SECURITY_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(MARKABLE_SECURITY_FORM),
    },
    {
      title: "Tax Sheltered Investment",
      description: "Tax sheltered investment",
      category: SETTING_CATEGORY.TAX_SHELTERED_INVESTMENT,
      list: TAX_SHELTERED_INVESTMENT_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(TAX_SHELTERED_INVESTMENT_FORM),
    },
    {
      title: "Insurance",
      description: "Insurance",
      category: SETTING_CATEGORY.INSURANCE,
      list: INSURANCE_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(INSURANCE_FORM),
    },
    {
      title: "Real Estate",
      description: "Real Estate Property",
      category: SETTING_CATEGORY.REAL_ESTATE,
      list: REAL_ESTATE_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(REAL_ESTATE_FORM),
    },
    {
      title: "Vehicles",
      description: "Personal Vehicles",
      category: SETTING_CATEGORY.VEHICLES,
      list: REAL_ESTATE_FORM,
      schema: (data: any): Joi.ObjectSchema =>
        SETTINGS_SCHEMA_GENERATOR(REAL_ESTATE_FORM),
    },
  ],
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
