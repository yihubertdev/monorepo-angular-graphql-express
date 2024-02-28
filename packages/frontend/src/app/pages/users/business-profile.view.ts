import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { IMenu } from "type-sources";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AsyncPipe, NgClass, NgStyle } from "@angular/common";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs";
import { StateDrawMenu } from "../../core/services/state";
import { BUSINESS_PROFILE_SETTING_MENU } from "../businessProfile";

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    NgStyle,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatListModule,
    RouterOutlet,
    MatSidenavModule,
  ],
  styles: `
    .hideNav {
      display: none;
    }
  `,
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <mat-nav-list [ngClass]="isNavDisplay ? '' : 'hideNav'">
      @for (menu of menus; track $index) {
        <a
          mat-list-item
          [routerLink]="menu.link">
          <mat-icon matListItemIcon>{{ menu.iconName }}</mat-icon>
          <div matListItemTitle>{{ menu.description }}</div>
        </a>
      }
    </mat-nav-list>
    <mat-drawer-container>
      <mat-drawer
        [opened]="_state.get | async"
        #drawer
        mode="side"
        [ngClass]="isNavDisplay ? 'hideNav' : ''"
        [ngStyle]="{ width: '18dvw' }">
        <mat-nav-list>
          @for (menu of menus; track $index) {
            <a
              mat-list-item
              [routerLink]="menu.link">
              <mat-icon matListItemIcon>{{ menu.iconName }}</mat-icon>
              <div matListItemTitle>{{ menu.description }}</div>
            </a>
          }
        </mat-nav-list></mat-drawer
      >
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export default class SettingView implements OnInit {
  public menus: IMenu[] = BUSINESS_PROFILE_SETTING_MENU;
  public isNavDisplay: boolean = false;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    public _state: StateDrawMenu
  ) {}

  ngOnInit() {
    this._state.post(true);
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(map((result) => result.breakpoints))
      .subscribe((breakpoints) => {
        switch (true) {
          case breakpoints[Breakpoints.Medium]:
          case breakpoints[Breakpoints.Small]:
          case breakpoints[Breakpoints.XSmall]: {
            this.isNavDisplay = true;
            break;
          }

          case breakpoints[Breakpoints.Large]:
          case breakpoints[Breakpoints.XLarge]:
            this.isNavDisplay = false;
            break;

          default:
            break;
        }
      });
  }
}
