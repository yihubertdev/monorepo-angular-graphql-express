"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const sample_component_1 = require("./sample.component");
let UiModule = class UiModule {
};
UiModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [sample_component_1.UiComponent],
        imports: [],
        exports: [sample_component_1.UiComponent],
    })
], UiModule);
exports.UiModule = UiModule;
//# sourceMappingURL=sample.module.js.map