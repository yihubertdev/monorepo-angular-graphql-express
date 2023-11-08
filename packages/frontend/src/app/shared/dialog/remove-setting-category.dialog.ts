import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Component, Inject } from "@angular/core";

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `<h1 mat-dialog-title>Delete {{ data.title }} ?</h1>
    <div mat-dialog-content>
      <p>This will delete {{ data.title }}</p>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        (click)="dialogRef.close()">
        CLOSE
      </button>
      <button
        mat-raised-button
        color="warn"
        [mat-dialog-close]="data"
        cdkFocusInitial>
        DELETE
      </button>
    </div>`,
  styleUrls: [],
})
export class RemoveSettingCategoryDialog {
  public loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RemoveSettingCategoryDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      documentId: string;
      category: string;
    }
  ) {}
}
