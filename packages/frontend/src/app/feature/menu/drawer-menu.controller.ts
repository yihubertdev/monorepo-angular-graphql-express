import { Component } from "@angular/core";
import { IMenu } from "sources-types";
import { SITE_ROUTE_PAGE, homePageMenus } from "../../core/static/menu.static";
import { NgFor } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "src/app/core/services/fireAuth/auth";
@Component({
  standalone: true,
  imports: [NgFor, MatListModule, RouterModule, MatIconModule],
  selector: "drawer-menu-controller",
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        [routerLink]="menu.link"
        *ngFor="let menu of menus"
        routerLinkActive="active-list-item">
        <mat-icon matListItemIcon>{{ menu.iconName }}</mat-icon>
        <div matListItemTitle>{{ menu.description }}</div></a
      >
      <a
        mat-list-item
        routerLinkActive="active-list-item"
        (click)="logout()">
        <mat-icon matListItemIcon>account_circle</mat-icon>
        <div matListItemTitle>Logout</div></a
      >
    </mat-nav-list>
  `,
  styleUrls: ["./menu.style.css"],
})
export class DrawerMenuController {
  menus: IMenu[] = homePageMenus;

  constructor(private _auth: AuthService, private _router: Router) {}

  public logout() {
    this._auth.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
