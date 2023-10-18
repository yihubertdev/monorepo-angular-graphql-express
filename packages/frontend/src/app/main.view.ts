import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { MenuModule } from "./feature/menu/menu.module";
import { MatDrawerResponsiveDirectiveModule } from "./shared/directives/matDrawerResponsive/mat-drawer-responsive.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { SessionStorageService } from "./core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FirebaseMessagingService } from "./core/services/firebaseMessage/basic.message";
import { MainMenuController } from "./feature/menu/controller/main.controller";
import { MainIconController } from "./feature/menu/controller/svg-icon.controller";

// desktop: top toolbar container 6vh, main container 90vh, mobile: no top toolbar, main container 100vh
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MenuModule,
    MatDrawerResponsiveDirectiveModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressBarModule,
    MainMenuController,
    MainIconController,
  ],
  selector: "main-view",
  template: `
    <mat-toolbar class="mat-toolbar-responsive">
      <button
        *ngIf="hasUser"
        mat-icon-button
        (click)="opened = !opened">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Whatever Site Name</span>
      <header-menu-controller></header-menu-controller>
      <span class="example-spacer"></span>
      <svg-icon-menu-controller></svg-icon-menu-controller>
    </mat-toolbar>
    <mat-progress-bar
      *ngIf="isLoading"
      mode="indeterminate"></mat-progress-bar>
    <!-- desktop: 90dvh mobile: 100dvh -->
    <mat-drawer-container>
      <mat-drawer
        *ngIf="hasUser"
        [(opened)]="opened"
        #drawer
        mode="side"
        [attrOpenedStatus]="{
          xs: false,
          sm: false,
          md: true,
          lg: true,
          xl: true
        }"
        [ngStyle]="{
          width: '12dvw'
        }">
        <drawer-menu-controller></drawer-menu-controller
      ></mat-drawer>
      <!-- mat-drawer-content overflow default is auto, scrollable-->
      <!-- mat-drawer-content desktop width 88dvw, mobile width 100 dvw -->
      <mat-drawer-content>
        <router-outlet></router-outlet>
        <footer-controller class="responsive-footer"></footer-controller>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./main.style.css"],
})
export class MainView implements OnInit {
  public opened: boolean = false;
  public hasUser?: IUser | undefined;
  public isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _sessionStorage: SessionStorageService,
    private _firebaseMessaging: FirebaseMessagingService
  ) {
    this._router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.hasUser = this._sessionStorage.getSessionStorage<IUser>("user");

    this._firebaseMessaging.requestToken();
  }
}
