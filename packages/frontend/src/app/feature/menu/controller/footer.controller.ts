import { Component } from "@angular/core";
import { IMenu } from "src/app/core/models/layout.type";
import { homePageMenus } from "src/app/core/static/post.static";

@Component({
  selector: "footer-menu-controller",
  template: `
    <nav
      mat-tab-nav-bar
      class="child-centered mat-tab-group-inverted-header main-nav">
      <a
        mat-tab-link
        [routerLink]="icon.link"
        [style.min-width]="icon.width"
        *ngFor="let icon of footerIconLayout">
        <mat-icon>{{ icon.iconName }}</mat-icon>
      </a>
    </nav>
  `,
  styleUrls: [],
})
export class FooterMenuController {
  footerIconLayout: IMenu[] = homePageMenus;
}
