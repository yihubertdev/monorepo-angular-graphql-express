import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { TextEditorOptionsComponent } from "./text-editor-options.controller";

@Component({
  selector: "add-text-editor-controller",
  template: ` <mat-icon (click)="openOAuthOptions()">add_circle</mat-icon> `,
  styleUrls: [],
})
export class AddTextEditorControllerComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsComponent);
  }
}
