import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { headerMenu } from "../../../core/static/menu.static";

@Component({
  selector: "header-menu-controller",
  template: `
    <ng-container *ngFor="let menus of headerMenuLayout">
      <button
        *ngIf="menus.subMenu"
        mat-button
        [matMenuTriggerFor]="subMenu"
        [routerLink]="menus.link ? menus.link : []">
        {{ menus.description }}
        <mat-menu #subMenu="matMenu">
          <button
            mat-menu-item
            *ngFor="let menu of menus.subMenu"
            [routerLink]="menu.link ? menu.link : []">
            {{ menu.description }}
          </button>
        </mat-menu>
      </button>

      <button
        *ngIf="!menus.subMenu"
        mat-button
        [routerLink]="menus.link ? menus.link : []">
        {{ menus.description }}
      </button>
    </ng-container>
  `,
  styleUrls: [],
})
export class HeaderMenuController {
  headerMenuLayout = headerMenu;

  constructor(private router: Router) {}
}
