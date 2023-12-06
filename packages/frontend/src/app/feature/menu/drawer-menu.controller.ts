import { Component, Input, OnInit } from "@angular/core";
import { IMenu } from "sources-types";
import { SITE_ROUTE_PAGE, DRAWER_MENU } from "../../core/static/menu.static";
import { NgFor, NgStyle } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { User } from "@angular/fire/auth";
import { MatCardModule } from "@angular/material/card";
import { UserPhotoPipe } from "../../shared/pipes/default-photo.pipe";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "drawer-menu-controller",
  template: `
    <mat-card style="box-shadow: none;">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>{{ currentUser.displayName }} </mat-card-title>
          <mat-card-subtitle
            >Email: {{ currentUser.email }} <br />
            Phone: {{ currentUser.phoneNumber }}</mat-card-subtitle
          >
          <div
            class="user-avatar-size user-avatar-square"
            [ngStyle]="{
              backgroundImage:
                'url(' +
                (currentUser.photoURL ?? null | defaultUserPhoto) +
                ')',
              backgroundSize: 'cover',
            }"></div>
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-actions class="mt-3 mb-4">
        <a
          class="m-2"
          mat-button
          [routerLink]="['/users', 'me', 'personal-profile']"
          >View Profile <mat-icon> visibility </mat-icon></a
        >
        <a
          class="m-2"
          mat-raised-button
          color="primary"
          [routerLink]="['/users', 'profile-signup']">
          Build Profile
          <mat-icon>account_box</mat-icon>
        </a>
      </mat-card-actions>
      <mat-card-content>
        <mat-nav-list>
          <a
            mat-list-item
            [routerLink]="menu.link"
            *ngFor="let menu of menus"
            routerLinkActive="active-list-item">
            <mat-icon matListItemIcon>{{ menu.iconName }}</mat-icon>
            <div matListItemTitle>{{ menu.description }}</div></a
          >
          <a
            mat-list-item
            routerLinkActive="active-list-item"
            (click)="logout()">
            <mat-icon matListItemIcon>account_circle</mat-icon>
            <div matListItemTitle>LOGOUT</div></a
          >
        </mat-nav-list>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./menu.style.css"],
  imports: [
    NgStyle,
    NgFor,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    UserPhotoPipe,
    MatButtonModule,
  ],
})
export class DRAWER_MENUController implements OnInit {
  @Input({ required: true }) currentUser!: User;
  menus: IMenu[] = DRAWER_MENU;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    console.log(this.currentUser);
  }

  public logout() {
    this._auth.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
