"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadVideoDialogModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const dialog_1 = require("@angular/material/dialog");
const input_1 = require("@angular/material/input");
const snack_bar_1 = require("@angular/material/snack-bar");
const google_http_1 = require("src/app/core/services/http/google.http");
const upload_video_dialog_1 = require("./upload-video.dialog");
let UploadVideoDialogModule = class UploadVideoDialogModule {
};
UploadVideoDialogModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [upload_video_dialog_1.UploadVideoDialog],
        imports: [
            common_1.CommonModule,
            dialog_1.MatDialogModule,
            forms_1.FormsModule,
            input_1.MatInputModule,
            snack_bar_1.MatSnackBarModule,
        ],
        providers: [google_http_1.GoogleHttpService],
        exports: [upload_video_dialog_1.UploadVideoDialog],
    })
], UploadVideoDialogModule);
exports.UploadVideoDialogModule = UploadVideoDialogModule;
//# sourceMappingURL=upload-video.module.js.map