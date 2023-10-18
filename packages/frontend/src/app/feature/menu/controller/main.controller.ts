import { Component } from "@angular/core";
import { IMenu } from "sources-types";
import { homePageMenus } from "../../../core/static/menu.static";
import { NgFor } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
@Component({
  standalone: true,
  imports: [NgFor, MatListModule, RouterModule],
  selector: "drawer-menu-controller",
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        [routerLink]="menu.link"
        *ngFor="let menu of menus"
        routerLinkActive="active-list-item">
        {{ menu.description }}</a
      >
    </mat-nav-list>
  `,
  styleUrls: ["../menu.style.css"],
})
export class MainMenuController {
  menus: IMenu[] = homePageMenus;
}
