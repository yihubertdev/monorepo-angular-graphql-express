"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadVideoDialog = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
const users_type_1 = require("src/app/core/models/users.type");
const constants_1 = require("src/app/core/models/constants");
let UploadVideoDialog = class UploadVideoDialog {
    constructor(dialogRef, data, ngZone, _googleHttpService, _snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ngZone = ngZone;
        this._googleHttpService = _googleHttpService;
        this._snackBar = _snackBar;
        this.loading = false;
        dialogRef.disableClose = true;
    }
    async _validateYoutuber(id) {
        await this._googleHttpService.validateYoutubeVideo(id);
    }
    onNoClick() {
        this.ngZone.run(() => {
            this.dialogRef.close();
        });
    }
    continue() {
        this.ngZone.run(async () => {
            this.loading = true;
            try {
                await this._validateYoutuber(this.data.id);
                this.dialogRef.close(this.data.id);
            }
            catch {
                this.loading = false;
                this._snackBar.open(users_type_1.VALIDATE_VIDEO_ERROR, constants_1.POP_UP_ACTION, {
                    duration: constants_1.POP_UP_DISMISS_DURATION,
                    verticalPosition: constants_1.POP_UP_VERTICAL_POSITION,
                });
            }
        });
    }
};
UploadVideoDialog = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "upload-video-dialog",
        template: `<h1 mat-dialog-title>Validate Video</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Youtube Embed Video Id</mat-label>
        <input
          matInput
          [(ngModel)]="data.id" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        (click)="onNoClick()">
        No Thanks
      </button>
      <button
        [class.spinner]="loading"
        [disabled]="loading"
        mat-raised-button
        color="primary"
        class="btn-full-width"
        (click)="continue()">
        Continue
      </button>
    </div>`,
        styleUrls: [],
    }),
    tslib_1.__param(1, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA))
], UploadVideoDialog);
exports.UploadVideoDialog = UploadVideoDialog;
//# sourceMappingURL=upload-video.dialog.js.map