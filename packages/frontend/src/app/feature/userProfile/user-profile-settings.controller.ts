import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IMenu, IUser } from "sources-types";
import { ProfileStorageService } from "../../core/services/fireStorage/profile.bucket";
import { UserPhotoPipe } from "../../shared/pipes/default-photo.pipe";
import { StringTransformPipe } from "../../shared/pipes/string-tranform.pipe";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { PROFILE_SETTINGS_MENU } from "src/app/pages/settings";

@Component({
  standalone: true,
  selector: "user-profile-settings-controller",
  imports: [
    NgFor,
    NgIf,
    NgStyle,
    MatCardModule,
    StringTransformPipe,
    UserPhotoPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
  ],
  providers: [ProfileStorageService],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title
            >{{ currentUser?.displayName ?? "Guest" }}
          </mat-card-title>
          <mat-card-subtitle
            >@{{ currentUser?.userId ?? "guest" }}
          </mat-card-subtitle>
          <div
            class="user-avatar-size user-avatar-square"
            [ngStyle]="{
              backgroundImage:
                'url(' +
                (currentUser?.photoURL ?? undefined | defaultUserPhoto) +
                ')',
              backgroundSize: 'cover',
            }">
            <mat-icon
              class="user-avatar-uploader-center cursor-pointer"
              (click)="triggerUpload()"
              >upload</mat-icon
            >
            <input
              type="file"
              (change)="uploadImage($event.target)"
              style="display:none"
              id="uploadProfile"
              #uploadProfile
              name="filedata" />
          </div>
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-actions>
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
            *ngFor="let menu of menus">
            <mat-icon matListItemIcon>{{ menu.iconName }}</mat-icon>
            <div matListItemTitle>{{ menu.description }}</div>
          </a>
        </mat-nav-list>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSettingsController implements OnInit {
  @Input() isSettingsPage?: boolean;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;

  menus: IMenu[] = PROFILE_SETTINGS_MENU;
  currentUser?: IUser;
  photoUrl: string =
    "https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(
    private profileStorage: ProfileStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const preloadData = this.route.snapshot.data as {
      user: IUser;
    };

    this.currentUser = preloadData.user;
  }

  async uploadImage(eventTarget: EventTarget | null) {
    const element = eventTarget as HTMLInputElement | null;
    const file = element?.files;
    if (!file || !this.currentUser) return;

    const url = await this.profileStorage.upload(file[0], this.currentUser?.id);
    this.photoUrl = url;
  }

  triggerUpload() {
    this.uploadProfile.nativeElement.click();
  }
}
