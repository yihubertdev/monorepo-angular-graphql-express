"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInputListModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const expansion_1 = require("@angular/material/expansion");
const forms_1 = require("@angular/forms");
const input_1 = require("@angular/material/input");
const post_card_component_1 = require("./post-card.component");
let FormInputListModule = class FormInputListModule {
};
FormInputListModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [post_card_component_1.FormInputListComponent],
        imports: [
            common_1.CommonModule,
            expansion_1.MatExpansionModule,
            forms_1.ReactiveFormsModule,
            input_1.MatInputModule,
        ],
        exports: [post_card_component_1.FormInputListComponent],
    })
], FormInputListModule);
exports.FormInputListModule = FormInputListModule;
//# sourceMappingURL=post-card.module.js.map