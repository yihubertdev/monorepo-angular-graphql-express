import { Component, Inject, NgZone } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GoogleHttpService } from "src/app/core/services/http/google.http";
import {
  VALIDATE_VIDEO_ERROR,
  POP_UP_ACTION,
  POP_UP_DISMISS_DURATION,
  POP_UP_VERTICAL_POSITION,
} from "sources-types";

@Component({
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
})
export class UploadVideoDialog {
  public loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UploadVideoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ngZone: NgZone,
    private _googleHttpService: GoogleHttpService,
    private _snackBar: MatSnackBar
  ) {
    dialogRef.disableClose = true;
  }

  private async _validateYoutuber(id: string) {
    await this._googleHttpService.validateYoutubeVideo(id);
  }

  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  continue(): void {
    this.ngZone.run(async () => {
      this.loading = true;
      try {
        await this._validateYoutuber(this.data.id);
        this.dialogRef.close(this.data.id);
      } catch {
        this.loading = false;
        this._snackBar.open(VALIDATE_VIDEO_ERROR, POP_UP_ACTION, {
          duration: POP_UP_DISMISS_DURATION,
          verticalPosition: POP_UP_VERTICAL_POSITION,
        });
      }
    });
  }
}
