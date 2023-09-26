import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { addBlogMenu } from "../../../core/static/menu.static";

@Component({
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
export class TextEditorOptionsComponent {
  public addBlogIconLayout = addBlogMenu;
  constructor(
    public bottomSheetRef: MatBottomSheetRef<TextEditorOptionsComponent>
  ) {}
}
