"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInputListModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const expansion_1 = require("@angular/material/expansion");
const forms_1 = require("@angular/forms");
const input_1 = require("@angular/material/input");
const form_input_list_component_1 = require("./form-input-list.component");
const document_uploader_module_1 = require("../documentUploader/document-uploader.module");
const fire_storage_module_1 = require("src/app/core/services/fireStorage/fire-storage.module");
const editor_module_1 = require("../editor/editor.module");
const button_1 = require("@angular/material/button");
let FormInputListModule = class FormInputListModule {
};
FormInputListModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [form_input_list_component_1.FormInputListComponent],
        imports: [
            common_1.CommonModule,
            expansion_1.MatExpansionModule,
            forms_1.ReactiveFormsModule,
            input_1.MatInputModule,
            button_1.MatButtonModule,
            document_uploader_module_1.DocumentUploaderModule,
            fire_storage_module_1.FireStorageServiceModule,
            editor_module_1.EditorModule,
        ],
        exports: [form_input_list_component_1.FormInputListComponent],
    })
], FormInputListModule);
exports.FormInputListModule = FormInputListModule;
//# sourceMappingURL=form-input-list.module.js.map