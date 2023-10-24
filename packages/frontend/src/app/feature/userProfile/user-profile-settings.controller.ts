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
import { homePageMenus } from "src/app/core/static/menu.static";

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
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
  ],
  providers: [ProfileStorageService],
  template: `
    <mat-card style="border-radius: initial;">
      <mat-card-header>
        <mat-card-title style="display: inline !important;"
          >{{ currentUser?.displayName ?? "Guest" }}
        </mat-card-title>
        <mat-card-subtitle style="display: inline !important;"
          >@{{ currentUser?.userId ?? "guest" }}</mat-card-subtitle
        >
        <div
          class="user-avatar-size user-avatar"
          [ngStyle]="{
            backgroundImage:
              'url(' +
              (currentUser?.photoURL ?? undefined | defaultUserPhoto) +
              ')',
            backgroundSize: 'cover',
            marginLeft: 'auto'
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
      </mat-card-header>

      <mat-card-content>
        <mat-nav-list>
          <a
            mat-list-item
            [routerLink]="menu.link"
            *ngFor="let menu of menus"
            routerLinkActive="active-list-item">
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
  @Input() userId?: string;
  @Input() isSettingsPage?: boolean;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;

  menus: IMenu[] = homePageMenus;
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
