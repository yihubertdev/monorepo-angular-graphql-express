"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringTransformPipe = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const lodash_1 = require("lodash");
let StringTransformPipe = class StringTransformPipe {
    transform(value, key, isDisplay) {
        const displayValue = (0, lodash_1.isEmpty)(value) ? "N/A" : value;
        return isDisplay ? `${key}: ${displayValue}` : `${key}: N/A`;
    }
};
StringTransformPipe = tslib_1.__decorate([
    (0, core_1.Pipe)({
        name: "StringTransformPipe",
    })
], StringTransformPipe);
exports.StringTransformPipe = StringTransformPipe;
//# sourceMappingURL=string-transform.pipe.js.map