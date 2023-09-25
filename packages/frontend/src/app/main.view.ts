import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AuthService } from "./core/services/fireAuth/auth";
import {
  googleIconSvg,
  linkedlnIconSvg,
  twitterIconSvg,
} from "./core/static/post.static";
import { User } from "firebase/auth";
import { Store } from "@ngrx/store";

// desktop: top toolbar container 6vh, main container 90vh, mobile: no top toolbar, main container 100vh
@Component({
  selector: "main-view",
  template: `
    <mat-toolbar class="mat-toolbar-responsive">
      <button
        *ngIf="authService.userAuthObserver$ | async"
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
    <mat-drawer-container class="responsive-main-container">
      <mat-drawer
        *ngIf="authService.userAuthObserver$ | async"
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
      <mat-drawer-content id="matDrawerContentScroll">
        <router-outlet></router-outlet>
        <footer-controller></footer-controller>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./main.style.css"],
})
export class MainViewComponent {
  public userAuthObserver$?: Observable<User | null>;
  public opened: boolean = false;
  public hideFooter: boolean = false;

  constructor(
    public authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private store: Store<{ count: number }>
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

    store.select("count").subscribe((data) => console.log(data));
  }

  ngAfterViewInit(): void {
    (
      document.getElementById("matDrawerContentScroll") as HTMLElement
    ).addEventListener("scroll", async (scroll) => {
      const event = scroll.target as HTMLElement;

      event.scrollTo(0, 1);
    });
  }
}
