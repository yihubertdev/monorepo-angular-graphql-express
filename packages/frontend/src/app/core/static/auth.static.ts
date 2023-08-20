import { InputType } from "../models/constants";
import { IFormInput } from "../models/view.types";

export const yourAccountFormList: IFormInput[] = [
  {
    id: "displayName",
    type: InputType.TEXT,
    label: "Your Profile Name",
    key: "displayName",
    value: "",
    placeholder: "Edit your display name",
  },
  {
    id: "location",
    type: InputType.TEXT,
    label: "Your location",
    key: "location",
    value: "",
    placeholder: "Edit your location",
  },
  {
    id: "email",
    type: InputType.TEXT,
    label: "Email",
    key: "email",
    value: "",
    placeholder: "Edit your email",
  },
  {
    id: "phone",
    type: InputType.TEXT,
    label: "Your phone",
    key: "phone",
    value: "",
    placeholder: "Edit phone",
  },
  {
    id: "image",
    type: InputType.UPLOAD,
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
    type: InputType.EMAIL,
    label: "Your Email",
    key: "email",
    value: "",
    placeholder: "Enter Email",
  },
  {
    id: "password",
    type: InputType.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    placeholder: "Enter Password",
  },
];

export const userSignUpFormList: IFormInput[] = [
  {
    id: "username",
    type: InputType.TEXT,
    label: "Your Username",
    key: "username",
    value: "",
    placeholder: "Edit username",
    error: "",
  },
  {
    id: "email",
    type: InputType.EMAIL,
    label: "Your Email",
    key: "email",
    value: "",
    placeholder: "Enter Email",
    error: "",
  },
  {
    id: "password",
    type: InputType.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    placeholder: "Enter Password",
    error: "",
  },
  {
    id: "repeat_password",
    type: InputType.PASSWROD,
    label: "Repeat your Password",
    key: "repeat_password",
    value: "",
    placeholder: "Repeat password",
    error: "",
  },
];
