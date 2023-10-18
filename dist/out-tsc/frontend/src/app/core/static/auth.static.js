"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpFormList = exports.userLoginFormList = exports.yourAccountFormList = void 0;
const constants_1 = require("../models/constants");
exports.yourAccountFormList = [
    {
        id: "displayName",
        type: constants_1.InputType.TEXT,
        label: "Your Profile Name",
        key: "displayName",
        value: "",
        formControlName: "displayName",
        placeholder: "Edit your display name",
    },
    {
        id: "location",
        type: constants_1.InputType.TEXT,
        label: "Your location",
        key: "location",
        value: "",
        formControlName: "location",
        placeholder: "Edit your location",
    },
    {
        id: "email",
        type: constants_1.InputType.TEXT,
        label: "Email",
        key: "email",
        value: "",
        formControlName: "email",
        placeholder: "Edit your email",
    },
    {
        id: "phone",
        type: constants_1.InputType.TEXT,
        label: "Your phone",
        key: "phone",
        value: "",
        formControlName: "phone",
        placeholder: "Edit phone",
    },
    {
        id: "image",
        type: constants_1.InputType.UPLOAD,
        label: "Your Image",
        key: "image",
        value: "",
        formControlName: "image",
        placeholder: "Edit image",
        documentPath: "postImage",
        documentCategory: "blog",
    },
];
exports.userLoginFormList = [
    {
        id: "email",
        type: constants_1.InputType.EMAIL,
        label: "Your Email",
        key: "email",
        value: "",
        formControlName: "email",
        placeholder: "Enter Email",
    },
    {
        id: "password",
        type: constants_1.InputType.PASSWROD,
        label: "Your Password",
        key: "password",
        value: "",
        formControlName: "password",
        placeholder: "Enter Password",
    },
];
exports.userSignUpFormList = [
    {
        id: "username",
        type: constants_1.InputType.TEXT,
        label: "Your Username",
        key: "username",
        value: "",
        formControlName: "username",
        placeholder: "Edit username",
    },
    {
        id: "email",
        type: constants_1.InputType.EMAIL,
        label: "Your Email",
        key: "email",
        value: "",
        formControlName: "email",
        placeholder: "Enter Email",
    },
    {
        id: "password",
        type: constants_1.InputType.PASSWROD,
        label: "Your Password",
        key: "password",
        value: "",
        formControlName: "password",
        placeholder: "Enter Password",
    },
    {
        id: "repeat_password",
        type: constants_1.InputType.PASSWROD,
        label: "Repeat your Password",
        key: "repeat_password",
        value: "",
        formControlName: "repeat_password",
        placeholder: "Repeat password",
    },
];
//# sourceMappingURL=auth.static.js.map