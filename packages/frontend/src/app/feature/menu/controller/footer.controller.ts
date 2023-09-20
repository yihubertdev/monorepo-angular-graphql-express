import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { IMenu } from "sources-types";
import { homePageMenus } from "src/app/core/static/post.static";
import { FooterMenuController } from "./footer-menu.controllers";

@Component({
  selector: "footer-controller",
  template: `
    <div
      #footer
      class="stick-footer responsive-footer"
      [ngStyle]="{ bottom: hideFooter ? '-50px' : '0px' }">
      <nav
        mat-tab-nav-bar
        class="child-centered mat-tab-group-inverted-header main-nav"
        [tabPanel]="tabPanel">
        <ng-container *ngFor="let icon of footerIconLayout">
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
  public footerIconLayout: IMenu[] = homePageMenus;
  public hideFooter: boolean = false;
  private _position: number = 0;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngAfterViewInit(): void {
    (
      document.getElementById("matDrawerContentScroll") as HTMLElement
    ).onscroll = async (scroll) => {
      const event = scroll.target as HTMLElement;
      if (event.scrollTop === 0) {
        this.hideFooter = false;
      } else if (event.offsetHeight + event.scrollTop >= event.scrollHeight) {
        this.hideFooter = true;
      } else {
        event.scrollTop > this._position
          ? (this.hideFooter = true)
          : (this.hideFooter = false);
      }
      this._position = event.scrollTop;
    };
  }

  openMenu() {
    this._bottomSheet.open(FooterMenuController);
  }
}
