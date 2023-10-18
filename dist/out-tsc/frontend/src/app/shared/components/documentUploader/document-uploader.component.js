"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUploaderComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const uuid_1 = require("uuid");
let DocumentUploaderComponent = class DocumentUploaderComponent {
    constructor(formFileStorage) {
        this.formFileStorage = formFileStorage;
        this.documentUpload = new core_1.EventEmitter();
        this.uploadPercentage = 0;
    }
    async uploadImage(eventTarget) {
        // Transform eventTarget to HTMLInputElement
        const element = eventTarget;
        // Get the upload file
        const file = element?.files;
        if (!file || !this.documentPath || !this.documentCategory)
            return;
        const uploadTask = this.formFileStorage.uploadWithPath(file[0], (0, uuid_1.v4)(), this.documentPath, this.documentCategory);
        this.formFileStorage.uploadPercent$?.subscribe((data) => {
            this.uploadPercentage = data.progress;
        });
        await uploadTask;
        const fileUrl = await this.formFileStorage.getDownloadURL();
        if (fileUrl) {
            this.documentUpload.emit(fileUrl);
        }
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], DocumentUploaderComponent.prototype, "documentPath", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], DocumentUploaderComponent.prototype, "documentCategory", void 0);
tslib_1.__decorate([
    (0, core_1.Output)()
], DocumentUploaderComponent.prototype, "documentUpload", void 0);
DocumentUploaderComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "document-uploader-component",
        template: ` <section style="display: block">
    <input
      type="file"
      matinput
      (change)="uploadImage($event.target)" />
    <mat-progress-bar
      mode="determinate"
      [value]="uploadPercentage"></mat-progress-bar>
  </section>`,
        styleUrls: ["./document-uploader.component.css"],
    })
], DocumentUploaderComponent);
exports.DocumentUploaderComponent = DocumentUploaderComponent;
//# sourceMappingURL=document-uploader.component.js.map