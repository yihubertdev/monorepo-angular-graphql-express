import { Component } from "@angular/core";
import { IMenu } from "sources-types";
import { homePageMenus } from "src/app/core/static/post.static";

@Component({
  selector: "drawer-menu-controller",
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        [routerLink]="menu.link"
        *ngFor="let menu of menus"
        routerLinkActive="active-list-item">
        {{ menu.description }}</a
      >
    </mat-nav-list>
  `,
  styleUrls: ["../menu.style.css"],
})
export class MainMenuController {
  menus: IMenu[] = homePageMenus;
}
