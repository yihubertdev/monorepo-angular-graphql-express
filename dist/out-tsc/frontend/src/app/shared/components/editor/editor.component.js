"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
const uuid_1 = require("uuid");
const upload_video_dialog_1 = require("../../dialog/uploadVideo/upload-video.dialog");
const constants_1 = require("src/app/core/models/constants");
let EditorComponent = class EditorComponent {
    constructor(formFileStorage, _sanitizer, dialog) {
        this.formFileStorage = formFileStorage;
        this._sanitizer = _sanitizer;
        this.dialog = dialog;
        this.editorContent = "";
        this.editorContentChange = new core_1.EventEmitter();
        this.quillEditorModule = post_static_1.quillEditorModule;
        this.uploadPercentage = 0;
        this.videoId = "";
    }
    getEditorInstance(editorInstance) {
        this.editorRef = editorInstance;
        let toolbar = editorInstance.getModule("toolbar");
        toolbar.addHandler("image", () => {
            this.uploadImageRef.nativeElement.click();
        });
        toolbar.addHandler("video", () => {
            this.uploadVideo();
        });
    }
    exportEditorContent() {
        this.editorContentChange.emit(this.editorContent);
    }
    async uploadImage(eventTarget) {
        this.uploadPercentage = 0;
        // Transform eventTarget to HTMLInputElement
        const element = eventTarget;
        // Get the upload file
        const file = element?.files;
        if (!file)
            return;
        const uploadTask = this.formFileStorage.uploadWithPath(file[0], (0, uuid_1.v4)(), "article", "image");
        this.formFileStorage.uploadPercent$?.subscribe((data) => {
            this.uploadPercentage = data.progress;
        });
        await uploadTask;
        const fileUrl = await this.formFileStorage.getDownloadURL();
        if (fileUrl) {
            const img = `<img style="width: 80%" src='${fileUrl}'></img>`;
            const range = this.editorRef.getSelection();
            this.editorRef.clipboard.dangerouslyPasteHTML(range.index, img);
        }
    }
    async uploadVideo() {
        const dialogRef = this.dialog.open(upload_video_dialog_1.UploadVideoDialog, {
            disableClose: true,
            data: { id: this.videoId },
        });
        dialogRef.afterClosed().subscribe((id) => {
            const range = this.editorRef.getSelection();
            this.editorRef.insertEmbed(range.index, "video", `${constants_1.EMBED_YOUTUBE_URL}${id}`);
            this.editorRef.setSelection(range.index + 1);
        });
    }
};
tslib_1.__decorate([
    (0, core_1.ViewChild)("uploadImageRef")
], EditorComponent.prototype, "uploadImageRef", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], EditorComponent.prototype, "editorContent", void 0);
tslib_1.__decorate([
    (0, core_1.Output)()
], EditorComponent.prototype, "editorContentChange", void 0);
EditorComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "editor-component",
        template: ` <ng-container>
    <input
      type="file"
      (change)="uploadImage($event.target)"
      style="display:none"
      id="uploadImageRef"
      #uploadImageRef
      name="uploadImage" />

    <quill-editor
      (onEditorCreated)="getEditorInstance($event)"
      [(ngModel)]="editorContent"
      name="quillEditor"
      id="quillEditor"
      [modules]="quillEditorModule"
      trackChanges="all"
      [styles]="{ height: '65dvh' }"
      placeholder=""></quill-editor>
    <mat-progress-bar
      mode="determinate"
      [value]="uploadPercentage"></mat-progress-bar>
  </ng-container>`,
        styleUrls: [],
    })
], EditorComponent);
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map