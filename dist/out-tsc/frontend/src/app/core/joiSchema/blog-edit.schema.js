"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogEditSchema = void 0;
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
const blogEditSchema = (errorLocation, data) => {
    return Joi.object({
        title: Joi.string()
            .optional()
            .messages({
            "string.base": `'title' should be a type of 'string', user input is ${String(data.title)}`,
            "string.empty": `'title' should not be empty`,
        }),
        subTitle: Joi.string()
            .optional()
            .messages({
            "string.base": `'subTitle' should be a type of 'string', user input is ${String(data.subTitle)}`,
            "string.empty": `'subTitle' should not be empty`,
        }),
        alt: Joi.string()
            .optional()
            .messages({
            "string.base": `'alt' should be a type of 'string', user input is ${String(data.alt)}`,
            "string.empty": `'alt' should not be empty`,
        }),
        content: Joi.string()
            .optional()
            .messages({
            "string.base": `'content' should be a type of 'string', user input is ${String(data.alt)}`,
            "string.empty": `'content' should not be empty`,
        }),
    });
};
exports.blogEditSchema = blogEditSchema;
//# sourceMappingURL=blog-edit.schema.js.map