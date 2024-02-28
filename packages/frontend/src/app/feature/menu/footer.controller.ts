import { Component, HostListener } from "@angular/core";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { IMenu } from "type-sources";
import { footerMenus } from "../../core/static/menu.static";
import { NgFor, NgStyle } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: "footer-controller",
  imports: [
    NgFor,
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
            mat-tab-link
            [routerLink]="icon.link"
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

  constructor() {}

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
}
