import { InputType } from "../models/constants";
import { IFormInput } from "../models/view.types";

export const yourAccountFormList: IFormInput[] = [
  {
    id: "displayName",
    type: InputType.TEXT,
    label: "Your Profile Name",
    key: "displayName",
    value: "",
    formControlName: "displayName",
    placeholder: "Edit your display name",
  },
  {
    id: "location",
    type: InputType.TEXT,
    label: "Your location",
    key: "location",
    value: "",
    formControlName: "location",
    placeholder: "Edit your location",
  },
  {
    id: "email",
    type: InputType.TEXT,
    label: "Email",
    key: "email",
    value: "",
    formControlName: "email",
    placeholder: "Edit your email",
  },
  {
    id: "phone",
    type: InputType.TEXT,
    label: "Your phone",
    key: "phone",
    value: "",
    formControlName: "phone",
    placeholder: "Edit phone",
  },
  {
    id: "image",
    type: InputType.UPLOAD,
    label: "Your Image",
    key: "image",
    value: "",
    formControlName: "image",
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
    formControlName: "email",
    placeholder: "Enter Email",
  },
  {
    id: "password",
    type: InputType.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    formControlName: "password",
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
    formControlName: "username",
    placeholder: "Edit username",
  },
  {
    id: "email",
    type: InputType.EMAIL,
    label: "Your Email",
    key: "email",
    value: "",
    formControlName: "email",
    placeholder: "Enter Email",
  },
  {
    id: "password",
    type: InputType.PASSWROD,
    label: "Your Password",
    key: "password",
    value: "",
    formControlName: "password",
    placeholder: "Enter Password",
  },
  {
    id: "repeat_password",
    type: InputType.PASSWROD,
    label: "Repeat your Password",
    key: "repeat_password",
    value: "",
    formControlName: "repeat_password",
    placeholder: "Repeat password",
  },
];
