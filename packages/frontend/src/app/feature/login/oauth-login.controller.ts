import { Component } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { ISVGIconMenu } from "sources-types";
import { LOGIN_MENU } from "../../core/static/menu.static";
import { NgFor } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [NgFor, MatListModule, RouterModule, MatIconModule, MatButtonModule],
  selector: "oauth-login-controller",
  template: ` <mat-list class="login-panel">
    <a
      mat-list-item
      [routerLink]="menu.link"
      *ngFor="let menu of menus"
      routerLinkActive="active-list-item">
      <mat-icon
        style="transform: scale(2);"
        matListItemIcon
        [svgIcon]="menu.iconName"></mat-icon>
      <div matListItemTitle>{{ menu.description }}</div></a
    >
  </mat-list>`,
  styleUrls: ["./login.style.css"],
})
export class OAuthLoginControllerComponent {
  menus: ISVGIconMenu[] = LOGIN_MENU;

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
