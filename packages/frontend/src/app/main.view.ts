import { Component, OnInit } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {
  googleIconSvg,
  linkedlnIconSvg,
  twitterIconSvg,
} from "./core/static/post.static";
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
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SessionStorageService } from "./core/services/browserStorage/sessionStorage";
import { IUser } from "sources-types";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FirebaseMessagingService } from "./core/services/firebaseMessage/basic.message";

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
    MatSnackBarModule,
    MatProgressBarModule,
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
      <!-- <button
        mat-icon-button
        class="twitter-icon"
        aria-label="twitter">
        <mat-icon
          svgIcon="twitter-icon"
          aria-hidden="false"
          aria-label="twitter"></mat-icon>
      </button>
      <button
        mat-icon-button
        class="google-icon"
        aria-label="google">
        <mat-icon
          svgIcon="google-icon"
          aria-hidden="false"
          aria-label="google"></mat-icon>
      </button>
      <button
        mat-icon-button
        class="linkedln-icon"
        aria-label="linkedln">
        <mat-icon
          svgIcon="linkedln-icon"
          aria-hidden="false"
          aria-label="linkedln"></mat-icon>
      </button> -->
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
    // iconRegistry: MatIconRegistry,
    // sanitizer: DomSanitizer,
    private _router: Router,
    private _sessionStorage: SessionStorageService,
    private _firebaseMessaging: FirebaseMessagingService
  ) {
    // iconRegistry.addSvgIconLiteral(
    //   "twitter-icon",
    //   sanitizer.bypassSecurityTrustHtml(twitterIconSvg)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   "google-icon",
    //   sanitizer.bypassSecurityTrustHtml(googleIconSvg)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   "linkedln-icon",
    //   sanitizer.bypassSecurityTrustHtml(linkedlnIconSvg)
    // );
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
