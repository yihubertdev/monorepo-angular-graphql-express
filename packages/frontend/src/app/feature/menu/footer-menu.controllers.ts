import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { IMenu } from "sources-types";
import { footerMenus } from "../../core/static/menu.static";
import { NgFor } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  imports: [NgFor, MatListModule, RouterModule, MatIconModule],
  template: `<mat-nav-list style="text-align: center;">
    <ng-container *ngFor="let icon of footerIconLayout">
      <a
        mat-list-item
        (click)="_bottomSheetRef.dismiss()"
        [routerLink]="icon.link">
        <span mat-line>{{ icon.description }}</span>
      </a>
    </ng-container>
  </mat-nav-list>`,
})
export class FooterMenuController {
  public footerIconLayout: IMenu[] = footerMenus;

  constructor(
    public _bottomSheetRef: MatBottomSheetRef<FooterMenuController>
  ) {}
}
