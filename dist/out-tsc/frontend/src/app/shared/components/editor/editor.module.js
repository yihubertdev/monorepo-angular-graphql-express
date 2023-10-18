"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const editor_component_1 = require("./editor.component");
const ngx_quill_1 = require("ngx-quill");
const forms_1 = require("@angular/forms");
const progress_bar_1 = require("@angular/material/progress-bar");
const upload_video_module_1 = require("../../dialog/uploadVideo/upload-video.module");
const google_http_1 = require("src/app/core/services/http/google.http");
let EditorModule = class EditorModule {
};
EditorModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [editor_component_1.EditorComponent],
        imports: [
            common_1.CommonModule,
            progress_bar_1.MatProgressBarModule,
            ngx_quill_1.QuillModule,
            forms_1.FormsModule,
            upload_video_module_1.UploadVideoDialogModule,
        ],
        providers: [google_http_1.GoogleHttpService],
        exports: [editor_component_1.EditorComponent],
    })
], EditorModule);
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.module.js.map