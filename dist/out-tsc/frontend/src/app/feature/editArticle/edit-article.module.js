"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArticleModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const edit_article_controller_1 = require("./controller/edit-article.controller");
const form_input_list_module_1 = require("src/app/shared/components/formInputList/form-input-list.module");
const snack_bar_1 = require("@angular/material/snack-bar");
let EditArticleModule = class EditArticleModule {
};
EditArticleModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [edit_article_controller_1.EditArticleController],
        imports: [common_1.CommonModule, form_input_list_module_1.FormInputListModule, snack_bar_1.MatSnackBarModule],
        exports: [edit_article_controller_1.EditArticleController],
    })
], EditArticleModule);
exports.EditArticleModule = EditArticleModule;
//# sourceMappingURL=edit-article.module.js.map