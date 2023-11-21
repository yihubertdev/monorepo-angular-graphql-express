import { Component, HostListener } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { IMenu } from "sources-types";
import {
  DRAWER_MENU,
  SITE_ROUTE_PAGE,
  footerMenus,
} from "../../core/static/menu.static";
import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "footer-controller",
  imports: [
    NgFor,
    NgIf,
    NgStyle,
    RouterModule,
    MatIconModule,
    MatTabsModule,
    MatBottomSheetModule,
  ],
  template: `
    <div
      #footer
      class="stick-footer"
      [ngStyle]="{ bottom: hideFooter ? '-34px' : '0px' }">
      <nav
        mat-tab-nav-bar
        [tabPanel]="tabPanel">
        <ng-container *ngFor="let icon of footerMenus">
          <a
            *ngIf="icon.iconName !== 'menu'"
            mat-tab-link
            [routerLink]="icon.link"
            [style.min-width]="icon.width">
            <mat-icon>{{ icon.iconName }}</mat-icon>
          </a>
          <a
            *ngIf="icon.iconName === 'menu'"
            mat-tab-link
            (click)="openMenu()"
            [style.min-width]="icon.width">
            <mat-icon>{{ icon.iconName }}</mat-icon>
          </a>
        </ng-container>
      </nav>
      <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
    </div>
  `,
  styleUrls: ["./menu.style.css"],
})
export class FooterController {
  public footerMenus: IMenu[] = footerMenus;
  public hideFooter: boolean = false;
  private _position: number = 0;

  constructor(private _bottomSheet: MatBottomSheet) {}

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event: Event) {
    let position =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    position >= this._position
      ? (this.hideFooter = true)
      : (this.hideFooter = false);

    this._position = position;
  }

  openMenu() {
    this._bottomSheet.open(FooterMenuController);
  }
}

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `<mat-nav-list>
    <a
      *ngFor="let icon of footerIconLayout"
      mat-list-item
      (click)="_bottomSheetRef.dismiss()"
      [routerLink]="icon.link">
      <mat-icon matListItemIcon> {{ icon.iconName }}</mat-icon>
      <div matListItemTitle>{{ icon.description }}</div>
      <div matListItemLine>{{ icon.description }}</div>
    </a>
    <a
      mat-list-item
      (click)="logout()">
      <mat-icon matListItemIcon>person</mat-icon>
      <div matListItemTitle>LOGOUT</div>
      <div matListItemLine>logout</div>
    </a>
    <a
      mat-list-item
      (click)="_bottomSheetRef.dismiss()">
      <mat-icon matListItemIcon>close</mat-icon>
      <div matListItemTitle>CLOSE</div>
      <div matListItemLine>close menu</div>
    </a>
  </mat-nav-list>`,
})
export class FooterMenuController {
  public footerIconLayout: IMenu[] = DRAWER_MENU;

  constructor(
    public _bottomSheetRef: MatBottomSheetRef<FooterMenuController>,
    private _auth: AuthService,
    private _router: Router
  ) {}

  public logout() {
    this._bottomSheetRef.dismiss();
    this._auth.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
