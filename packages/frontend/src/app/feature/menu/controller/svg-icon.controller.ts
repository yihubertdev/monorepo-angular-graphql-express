import { Component } from "@angular/core";
import { ISVGIconMenu } from "sources-types";
import { mainTopIconMenu } from "../../../core/static/menu.static";
import { NgFor, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatIconModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  selector: "svg-icon-menu-controller",
  template: `
    <a
      class="m-3 cursor-pointer unset-tag-a"
      routerLink="users/notifications">
      <mat-icon
        matBadge="15"
        matBadgeColor="warn"
        aria-hidden="false"
        >notifications
      </mat-icon>
    </a>
    <a
      *ngFor="let menu of menus"
      [routerLink]="menu.link"
      [style.min-width]="menu.width"
      class="m-3 cursor-pointer unset-tag-a">
      <mat-icon
        *ngIf="menu.src"
        [svgIcon]="menu.iconName">
      </mat-icon>

      <mat-icon *ngIf="!menu.src"> {{ menu.iconName }}</mat-icon>
    </a>
  `,
  styleUrls: ["../menu.style.css"],
})
export class MainIconController {
  menus: ISVGIconMenu[] = mainTopIconMenu;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.menus.map((menu) =>
      menu.src
        ? iconRegistry.addSvgIconLiteral(
            menu.iconName,
            sanitizer.bypassSecurityTrustHtml(menu.src)
          )
        : menu
    );
  }
}
