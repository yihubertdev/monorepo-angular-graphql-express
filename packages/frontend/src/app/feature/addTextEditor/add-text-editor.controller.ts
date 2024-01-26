import { Component } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from "@angular/material/bottom-sheet";
import { IUser } from "sources-types";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { SITE_ROUTE_PAGE } from "../../core/static/menu.static";
import { MatListModule } from "@angular/material/list";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { DRAWER_MENU } from "../../pages/users";

@Component({
  standalone: true,
  imports: [NgIf, MatIconModule, MatBottomSheetModule],
  selector: "add-text-editor-controller",
  template: ` <mat-icon (click)="openOAuthOptions()">add_circle</mat-icon> `,
  styleUrls: [],
})
export class AddTextEditorController {
  public hasUser?: IUser | undefined;
  constructor(private _bottomSheet: MatBottomSheet) {}

  openOAuthOptions() {
    this._bottomSheet.open(TextEditorOptionsDialog);
  }
}

@Component({
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  selector: "bottom-sheet-overview-example-sheet",
  template: `<mat-nav-list>
    @for (icon of footerIconLayout; track $index) {
      <a
        mat-list-item
        (click)="bottomSheetRef.dismiss()"
        [routerLink]="icon.link">
        <mat-icon matListItemIcon> {{ icon.iconName }}</mat-icon>
        <div matListItemTitle>{{ icon.description }}</div>
        <div matListItemLine>{{ icon.description }}</div>
      </a>
    }

    <a
      mat-list-item
      (click)="logout()">
      <mat-icon matListItemIcon>person</mat-icon>
      <div matListItemTitle>LOGOUT</div>
      <div matListItemLine>logout</div>
    </a>
    <a
      mat-list-item
      (click)="bottomSheetRef.dismiss()">
      <mat-icon matListItemIcon>close</mat-icon>
      <div matListItemTitle>CLOSE</div>
      <div matListItemLine>close menu</div>
    </a>
  </mat-nav-list>`,
})
export class TextEditorOptionsDialog {
  public footerIconLayout = DRAWER_MENU;
  constructor(
    public bottomSheetRef: MatBottomSheetRef<TextEditorOptionsDialog>,
    private _auth: AuthService,
    private _router: Router
  ) {}

  public logout() {
    this.bottomSheetRef.dismiss();
    this._auth.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
