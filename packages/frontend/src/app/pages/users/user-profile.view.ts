import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { UserProfileController } from "../../feature/userProfile/user-profile.controller";
import { MatTabsModule } from "@angular/material/tabs";
import { PROFILE_MENU } from "../profile";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  imports: [
    NgFor,
    UserProfileController,
    RouterOutlet,
    RouterLinkWithHref,
    MatTabsModule,
    MatIconModule,
  ],
  template: `
    <!-- container section height 90dvh, width responsive 100vw or 88vw  -->
    <div class="container-fluid">
      <div class="row justify-content-center m-0 p-0 mb-2">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 m-0 p-0">
          <user-profile-controller></user-profile-controller>
        </div>
      </div>
      <nav
        mat-tab-nav-bar
        [tabPanel]="tabPanel">
        <a
          mat-tab-link
          *ngFor="let menu of PROFILE_MENU"
          [routerLink]="menu.link"
          (click)="activeLink = menu.link"
          [active]="activeLink === menu.link">
          <mat-icon style="margin-right: 8px;">{{ menu.iconName }}</mat-icon>
          {{ menu.description }}
        </a>
      </nav>

      <mat-tab-nav-panel #tabPanel
        ><router-outlet></router-outlet
      ></mat-tab-nav-panel>
    </div>
  `,
  styleUrls: [],
})
export default class UserProfileView {
  public PROFILE_MENU = PROFILE_MENU;
  public activeLink = PROFILE_MENU[0].link;
}
