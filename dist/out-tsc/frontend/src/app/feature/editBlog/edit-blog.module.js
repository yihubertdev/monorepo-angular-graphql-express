"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBlogModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const edit_blog_controller_1 = require("./controller/edit-blog.controller");
const form_input_list_module_1 = require("src/app/shared/components/formInputList/form-input-list.module");
const snack_bar_1 = require("@angular/material/snack-bar");
let EditBlogModule = class EditBlogModule {
};
EditBlogModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [edit_blog_controller_1.EditBlogController],
        imports: [common_1.CommonModule, form_input_list_module_1.FormInputListModule, snack_bar_1.MatSnackBarModule],
        exports: [edit_blog_controller_1.EditBlogController],
    })
], EditBlogModule);
exports.EditBlogModule = EditBlogModule;
//# sourceMappingURL=edit-blog.module.js.map