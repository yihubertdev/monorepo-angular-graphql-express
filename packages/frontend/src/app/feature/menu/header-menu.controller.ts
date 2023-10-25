import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { headerMenu } from "../../core/static/menu.static";
import { NgFor, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "header-menu-controller",
  imports: [NgFor, NgIf, RouterModule, MatMenuModule, MatButtonModule],
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
})
export class HeaderMenuController {
  headerMenuLayout = headerMenu;
}
