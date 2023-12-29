import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { PROFILE_SETTINGS_MENU } from "../settings";
import { IMenu } from "sources-types";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgClass, NgStyle } from "@angular/common";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs";
import { StateDrawMenu } from "../../core/services/state/";

@Component({
  standalone: true,
  imports: [
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
        [opened]="opened"
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
export default class SettingView implements OnInit, OnDestroy {
  public menus: IMenu[] = PROFILE_SETTINGS_MENU;
  public isNavDisplay: boolean = false;
  public opened: boolean = true;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private _state: StateDrawMenu
  ) {}

  ngOnDestroy(): void {
    this.opened = true;
  }

  ngOnInit() {
    this._state.get.subscribe((value) => {
      if (value !== null) {
        this.opened = value;
      }
    });

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
