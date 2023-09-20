import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AuthService } from "./core/services/fireAuth/auth";
import {
  googleIconSvg,
  linkedlnIconSvg,
  twitterIconSvg,
} from "./core/static/post.static";
import { IUser } from "sources-types";

// desktop: top toolbar container 6vh, main container 90vh, mobile: no top toolbar, main container 100vh
@Component({
  selector: "main-view",
  template: `
    <mat-toolbar class="mat-toolbar-responsive">
      <button
        *ngIf="userAuthObserver$ | async"
        mat-icon-button
        (click)="opened = !opened">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Yihu Tech</span>
      <button mat-button>
        <a
          style="text-decoration: none; color: black;"
          routerLink="account/login">
          Login</a
        >
      </button>
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
    <mat-drawer-container class="responsive-main-container">
      <mat-drawer
        *ngIf="userAuthObserver$ | async"
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
        style="width: 12vw">
        <drawer-menu-controller></drawer-menu-controller
      ></mat-drawer>
      <!-- mat-drawer-content overflow default is auto, scrollable-->
      <mat-drawer-content
        id="matDrawerContentScroll"
        style="overflow-y: visible;">
        <router-outlet></router-outlet>
        <footer-controller></footer-controller>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./main.style.css"],
})
export class MainViewComponent implements OnInit {
  @ViewChild("footer") footer?: ElementRef;
  public userAuthObserver$?: Observable<IUser | null>;
  public opened: boolean = false;
  public hideFooter: boolean = false;

  constructor(
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
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
  }

  ngOnInit() {
    this.userAuthObserver$ = this.authService.userAuthObserver$;
  }

  ngAfterViewInit(): void {
    window.addEventListener("load", () => {
      window.scrollTo(0, 1);
    });
  }
}
