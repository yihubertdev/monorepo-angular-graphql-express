"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleEditSchema = void 0;
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
// Make sure schema object key match to the form list key
const articleEditSchema = (errorLocation, data) => {
    return Joi.object({
        content: Joi.string()
            .optional()
            .messages({
            "string.base": `'content' should be a type of 'string', user input is ${String(data.content)}`,
            "string.empty": `'content' should not be empty`,
        }),
    });
};
exports.articleEditSchema = articleEditSchema;
//# sourceMappingURL=article-edit.schema.js.map