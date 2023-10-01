import { IFormInput, INPUT_TYPE } from "sources-types";

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
