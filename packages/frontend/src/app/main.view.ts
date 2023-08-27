import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { isEmpty } from "lodash";
import { map, Observable } from "rxjs";
import { IMenu } from "./core/models/layout.type";
import { IUser } from "./core/models/users.type";
import { AuthService } from "./core/services/fireAuth/auth";
import {
  googleIconSvg,
  homePageMenus,
  linkedlnIconSvg,
  twitterIconSvg,
} from "./core/static/post.static";

// desktop: top toolbar container 6vh, main container 90vh, mobile: no top toolbar, main container 100vh
@Component({
  selector: "main-view",
  template: `
    <mat-toolbar class="mat-toolbar-responsive">
      <button
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
      <mat-drawer-content>
        <div style="width: 100%; height: 100%">
          <!-- desktop: top tool bar 10vh, main content 90vh, no footer. mobile: no top toolbar, main content 90vh, footer 10vh -->
          <mat-grid-list
            cols="1"
            rowHeight="10dvh">
            <mat-grid-tile
              [attrGridColSpan]="{
                xs: {
                  colspan: 1,
                  rowspan: 9
                },
                sm: {
                  colspan: 1,
                  rowspan: 9
                },
                md: {
                  colspan: 1,
                  rowspan: 9
                },
                lg: {
                  colspan: 1,
                  rowspan: 9
                },
                xl: {
                  colspan: 1,
                  rowspan: 9
                }
              }">
              <ng-container *ngIf="(userAuthObserver$ | async) === null">
                <mat-spinner></mat-spinner>
              </ng-container>
              <ng-container *ngIf="userAuthObserver$ | async">
                <router-outlet></router-outlet>
              </ng-container>
            </mat-grid-tile>

            <mat-grid-tile
              [attrGridColSpan]="{
                xs: {
                  colspan: 1,
                  rowspan: 1
                },
                sm: {
                  colspan: 1,
                  rowspan: 1
                },
                md: {
                  colspan: 1,
                  rowspan: 0
                },
                lg: {
                  colspan: 1,
                  rowspan: 0
                },
                xl: {
                  colspan: 1,
                  rowspan: 0
                }
              }"
              class="stick-footer">
              <footer-menu-controller></footer-menu-controller>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./main.style.css"],
})
export class MainViewComponent implements OnInit {
  public isDisplay: boolean = false;
  userAuthObserver$?: Observable<IUser | null>;
  footerIconLayout: IMenu[] = homePageMenus;
  public opened: boolean = false;

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
    this.userAuthObserver$
      .pipe(
        map((user) => {
          if (!user) {
            return;
          }
          return {
            id: user.id,
            role: user.role,
          };
        })
      )
      .subscribe({
        next: (user) => {
          if (!user || isEmpty(user.id)) {
            this.isDisplay = true;
            return;
          }

          this.isDisplay = !this.authService.isVisitor(user.role);
        },
      });
  }
}
