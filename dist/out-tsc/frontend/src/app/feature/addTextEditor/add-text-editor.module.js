"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTextEditorModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const icon_1 = require("@angular/material/icon");
const add_text_editor_controller_1 = require("./controller/add-text-editor.controller");
const bottom_sheet_1 = require("@angular/material/bottom-sheet");
const list_1 = require("@angular/material/list");
const text_editor_options_controller_1 = require("./controller/text-editor-options.controller");
let AddTextEditorModule = class AddTextEditorModule {
};
AddTextEditorModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [add_text_editor_controller_1.AddTextEditorControllerComponent, text_editor_options_controller_1.TextEditorOptionsComponent],
        imports: [common_1.CommonModule, icon_1.MatIconModule, bottom_sheet_1.MatBottomSheetModule, list_1.MatListModule],
        exports: [add_text_editor_controller_1.AddTextEditorControllerComponent, text_editor_options_controller_1.TextEditorOptionsComponent],
    })
], AddTextEditorModule);
exports.AddTextEditorModule = AddTextEditorModule;
//# sourceMappingURL=add-text-editor.module.js.map