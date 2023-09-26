import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { IMenu } from "sources-types";
import { footerMenus } from "../../../core/static/menu.static";

@Component({
  selector: "bottom-sheet-overview-example-sheet",
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
