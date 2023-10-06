import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { TextEditorOptionsComponent } from "./text-editor-options.controller";
import { SessionStorageService } from "../../../core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";

@Component({
  selector: "add-text-editor-controller",
  template: `
    <mat-icon
      *ngIf="hasUser"
      (click)="openOAuthOptions()"
      >add_circle</mat-icon
    >
  `,
  styleUrls: [],
})
export class AddTextEditorControllerComponent {
  public hasUser?: IUser | undefined;
  constructor(
    private _sessionStorage: SessionStorageService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.hasUser = this._sessionStorage.getSessionStorage<IUser>("user");
  }

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsComponent);
  }
}
