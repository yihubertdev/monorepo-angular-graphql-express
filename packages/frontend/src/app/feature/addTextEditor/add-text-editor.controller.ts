import { Component } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from "@angular/material/bottom-sheet";
import { SessionStorageService } from "../../core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";
import { MatIconModule } from "@angular/material/icon";
import { NgFor, NgIf } from "@angular/common";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { addBlogMenu } from "../../core/static/menu.static";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [NgIf, MatIconModule, MatBottomSheetModule],
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
export class AddTextEditorController {
  public hasUser?: IUser | undefined;
  constructor(
    private _sessionStorage: SessionStorageService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.hasUser = this._sessionStorage.getSessionStorage<IUser>("user");
  }

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsBottomSheet);
  }
}

@Component({
  standalone: true,
  imports: [NgFor, MatListModule, RouterModule],
  selector: "bottom-sheet-overview-example-sheet",
  template: `<mat-nav-list>
    <ng-container *ngFor="let icon of addBlogIconLayout">
      <a
        mat-list-item
        (click)="bottomSheetRef.dismiss()"
        [routerLink]="icon.link">
        <span mat-line>{{ icon.description }}</span>
      </a>
    </ng-container>
  </mat-nav-list>`,
})
export class TextEditorOptionsBottomSheet {
  public addBlogIconLayout = addBlogMenu;
  constructor(
    public bottomSheetRef: MatBottomSheetRef<TextEditorOptionsBottomSheet>
  ) {}
}
