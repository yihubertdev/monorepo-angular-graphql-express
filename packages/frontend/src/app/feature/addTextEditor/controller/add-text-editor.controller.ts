import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { TextEditorOptionsComponent } from "./text-editor-options.controller";

@Component({
  selector: "add-text-editor-controller",
  template: `
    <ng-container *ngIf="(authService.userAuthObserver$ | async)?.id">
      <mat-icon
        class="fab-button icon-display"
        (click)="openOAuthOptions()"
        >add_circle</mat-icon
      >
    </ng-container>
  `,
  styleUrls: ["../add-text-editor.style.css"],
})
export class AddTextEditorControllerComponent {
  constructor(
    private _bottomSheet: MatBottomSheet,
    public authService: AuthService
  ) {}

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsComponent);
  }
}
