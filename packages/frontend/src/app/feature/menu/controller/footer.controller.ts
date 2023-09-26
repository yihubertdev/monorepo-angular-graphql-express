import { Component, HostListener } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { IMenu } from "sources-types";
import { footerMenus } from "../../../core/static/menu.static";
import { FooterMenuController } from "./footer-menu.controllers";

@Component({
  selector: "footer-controller",
  template: `
    <div
      #footer
      class="stick-footer"
      [ngStyle]="{ bottom: hideFooter ? '-50px' : '0px' }">
      <nav
        mat-tab-nav-bar
        class="child-centered mat-tab-group-inverted-header main-nav"
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
  styleUrls: ["../menu.style.css"],
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
    let screenHeight = document.documentElement.scrollHeight;

    if (position === screenHeight) {
      // Check scroll position at the top of the page
      this.hideFooter = false;
    } else if (
      // Check scroll position at the bottom of the page
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight
    ) {
      this.hideFooter = true;
    } else {
      position >= this._position
        ? (this.hideFooter = true)
        : (this.hideFooter = false);
    }
    this._position = position;
  }

  openMenu() {
    this._bottomSheet.open(FooterMenuController);
  }
}
