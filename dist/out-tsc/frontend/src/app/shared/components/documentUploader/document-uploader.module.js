"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUploaderModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const document_uploader_component_1 = require("./document-uploader.component");
const progress_bar_1 = require("@angular/material/progress-bar");
const fire_storage_module_1 = require("src/app/core/services/fireStorage/fire-storage.module");
let DocumentUploaderModule = class DocumentUploaderModule {
};
DocumentUploaderModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [document_uploader_component_1.DocumentUploaderComponent],
        imports: [common_1.CommonModule, progress_bar_1.MatProgressBarModule, fire_storage_module_1.FireStorageServiceModule],
        exports: [document_uploader_component_1.DocumentUploaderComponent],
    })
], DocumentUploaderModule);
exports.DocumentUploaderModule = DocumentUploaderModule;
//# sourceMappingURL=document-uploader.module.js.map