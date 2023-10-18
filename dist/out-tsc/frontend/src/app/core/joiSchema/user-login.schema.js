"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpSchema = exports.userLoginSchema = void 0;
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
const userLoginSchema = (errorLocation, data) => {
    return Joi.object({
        email: Joi.string()
            .optional()
            .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .messages({
            "string.base": `'email' should be a type of 'string', user input is ${String(data.email)}`,
            "object.regex": `'email' should follow email pattern, user input is ${String(data.email)}`,
            "string.pattern.base": `'email' should follow email pattern, user input is ${String(data.email)}`,
            "string.empty": `Please enter your email.`,
        }),
        password: Joi.string()
            .optional()
            .messages({
            "string.base": `password should be a type of 'string', user input is ${String(data.password)}`,
            "string.empty": `Please enter your password.`,
        }),
    });
};
exports.userLoginSchema = userLoginSchema;
const userSignUpSchema = (errorLocation, data) => {
    return Joi.object({
        username: Joi.string()
            .required()
            .messages({
            "string.base": `'username' should be a type of 'string', user input is ${String(data.username)}`,
            "string.empty": `Please enter your username`,
        }),
        email: Joi.string()
            .required()
            .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .messages({
            "string.base": `'email' should be a type of 'string', user input is ${String(data.email)}`,
            "object.regex": `'email' should follow email pattern, user input is ${String(data.email)}`,
            "string.pattern.base": `'email' should follow email pattern, user input is ${String(data.email)}`,
            "string.empty": `Please enter your email.`,
        }),
        password: Joi.string()
            .required()
            .messages({
            "string.base": `password should be a type of 'string', user input is ${String(data.password)}`,
            "string.empty": `Please enter your password.`,
        }),
        repeat_password: Joi.string()
            .required()
            .valid(Joi.ref("password"))
            .messages({
            "string.base": `password should be a type of 'string', user input is ${String(data.repeat_password)}`,
            "string.empty": `Please enter your password.`,
            "any.only": "Password and repeat password must be equal",
        }),
    });
};
exports.userSignUpSchema = userSignUpSchema;
//# sourceMappingURL=user-login.schema.js.map