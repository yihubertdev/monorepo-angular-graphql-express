import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { Observable } from "rxjs";
import { IUser } from "src/app/core/models/users.type";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { TextEditorOptionsComponent } from "./text-editor-options.controller";

@Component({
  selector: "add-text-editor-controller",
  template: `
    <ng-container *ngIf="(userAuthObserver$ | async)?.id">
      <mat-icon
        class="fab-button icon-display"
        (click)="openOAuthOptions()"
        >add_circle</mat-icon
      >
    </ng-container>
  `,
  styleUrls: ["../add-text-editor.style.css"],
})
export class AddTextEditorControllerComponent implements OnInit {
  userAuthObserver$?: Observable<IUser | null>;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userAuthObserver$ = this.authService.userAuthObserver$;
  }

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsComponent);
  }
}
