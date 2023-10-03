import { Component } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {
  googleIconSvg,
  linkedlnIconSvg,
  twitterIconSvg,
} from "./core/static/post.static";
import { AuthService } from "./core/services/fireAuth/auth";
import { RouterOutlet } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { MenuModule } from "./feature/menu/menu.module";
import { MatDrawerResponsiveDirectiveModule } from "./shared/directives/matDrawerResponsive/mat-drawer-responsive.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FireAuthServiceModule } from "./core/services/fireAuth/auth.module";
import { ServiceModule } from "./core/services/services.module";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";

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
    FireAuthServiceModule,
    ServiceModule,
    MatButtonModule,
    MatSnackBarModule,
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
      <button
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
      </button>
    </mat-toolbar>

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
export class MainView {
  public opened: boolean = false;
  public hasUser?: boolean;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _authService: AuthService
  ) {
    iconRegistry.addSvgIconLiteral(
      "twitter-icon",
      sanitizer.bypassSecurityTrustHtml(twitterIconSvg)
    );
    iconRegistry.addSvgIconLiteral(
      "google-icon",
      sanitizer.bypassSecurityTrustHtml(googleIconSvg)
    );
    iconRegistry.addSvgIconLiteral(
      "linkedln-icon",
      sanitizer.bypassSecurityTrustHtml(linkedlnIconSvg)
    );

    this._authService.userAuthObserver$.subscribe((user) => {
      this.hasUser = Boolean(user);
    });
  }
}
