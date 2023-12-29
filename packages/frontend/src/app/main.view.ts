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
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgIf, NgStyle } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { DRAWER_MENUController } from "./feature/menu/drawer-menu.controller";
import { MainIconController } from "./feature/menu/svgicon-menu.controller";
import { HeaderMenuController } from "./feature/menu/header-menu.controller";
import { FooterController } from "./feature/menu/footer.controller";
import { AuthService } from "./core/services/fireAuth/auth";
import { User } from "@angular/fire/auth";
import { MatDrawerOpenDirective } from "./shared/directives/matDrawerResponsive/mat-drawer-menu";
import { AddTextEditorController } from "./feature/addTextEditor/add-text-editor.controller";

// desktop: top toolbar container 6vh, main container 90vh, mobile: no top toolbar, main container 100vh
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDrawerOpenDirective,
    MatSidenavModule,
    MatButtonModule,
    MatProgressBarModule,
    DRAWER_MENUController,
    HeaderMenuController,
    MainIconController,
    FooterController,
    AddTextEditorController,
  ],
  selector: "main-view",
  template: `
    <mat-toolbar class="mat-toolbar-responsive">
      <button
        *ngIf="userInfo"
        mat-icon-button
        (click)="opened = !opened">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Whatever Site Name</span>
      <header-menu-controller></header-menu-controller>
      <span class="top-menu-space"></span>
      <svg-icon-menu-controller></svg-icon-menu-controller>
    </mat-toolbar>
    <mat-progress-bar
      *ngIf="isLoading"
      mode="indeterminate"></mat-progress-bar>
    <!-- desktop: 90dvh mobile: 100dvh -->
    <mat-drawer-container>
      <mat-drawer
        *ngIf="userInfo"
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
        [ngStyle]="{ width: '18dvw' }">
        <drawer-menu-controller
          [currentUser]="userInfo"></drawer-menu-controller
      ></mat-drawer>
      <!-- mat-drawer-content overflow default is auto, scrollable-->
      <!-- mat-drawer-content desktop width 88dvw, mobile width 100 dvw -->
      <mat-drawer-content>
        <router-outlet></router-outlet>
        <div
          *ngIf="userInfo"
          class="fab-button icon-display">
          <add-text-editor-controller></add-text-editor-controller>
        </div>
        <footer-controller class="responsive-footer"></footer-controller>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./main.style.css"],
})
export class MainView implements OnInit {
  public opened: boolean = false;
  public userInfo?: User;
  public isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _auth: AuthService
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

    // const result = this._notification.getUserPosts();
    // result.subscribe();
  }

  ngOnInit(): void {
    this._auth.userAuthObserver$.subscribe((user) => {
      this.userInfo = this._auth.isUserVerified(user);
    });
    // this._firebaseMessaging.requestToken();
  }
}
