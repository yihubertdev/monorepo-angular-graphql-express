import { NgFor, NgIf, NgStyle } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
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
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { SuccessMessage } from "src/app/core/utils/error";

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
    MatDialogModule,
  ],
  providers: [ProfileStorageService],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>{{ currentUser.displayName }} </mat-card-title>
          <mat-card-subtitle>&#64;{{ currentUser.userId }} </mat-card-subtitle>
          <div
            class="user-avatar-size user-avatar-square"
            [ngStyle]="{
              backgroundImage:
                'url(' +
                (currentUser.photoURL ?? null | defaultUserPhoto) +
                ')',
              backgroundSize: 'cover'
            }">
            <mat-icon
              class="user-avatar-uploader-center cursor-pointer"
              (click)="uploadProfile.click()"
              >upload</mat-icon
            >
            <input
              type="file"
              (change)="uploadImage($event.target)"
              style="display:none"
              #uploadProfile />
          </div>
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-actions>
        <a
          class="m-2"
          mat-button
          [routerLink]="['/users', 'profile', 'me']"
          >View Profile <mat-icon> visibility </mat-icon></a
        >
        <a
          class="m-2"
          mat-raised-button
          color="primary"
          [routerLink]="['/users', 'profile', 'me']">
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
  currentUser!: IUser;
  photoUrl: string =
    "https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(
    public dialog: MatDialog,
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
    const dialogRef = this.dialog.open(ImageCropperDialog, {
      disableClose: true,
      data: {
        event: file[0],
        ratio: 1 / 1,
      },
    });
    this.uploadProfile.nativeElement.value = "";
    dialogRef.afterClosed().subscribe(async (data: Blob) => {
      if (!data) return;
      await this.profileStorage.uploadBlob(data);
      throw new SuccessMessage("Profile uploaded");
    });
  }
}

@Component({
  standalone: true,
  imports: [NgStyle, MatDialogModule, MatButtonModule, ImageCropperModule],
  template: `<h1 mat-dialog-title>Select Your Profile</h1>
    <div mat-dialog-content>
      <div class="row">
        <div class="col-6">
          <image-cropper
            [imageFile]="data.event"
            [maintainAspectRatio]="true"
            [aspectRatio]="data.ratio"
            format="png"
            (imageCropped)="imageCropped($event)"></image-cropper>
        </div>
        <div class="col-6"><img [src]="croppedImage" /></div>
      </div>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        (click)="dialogRef.close()">
        CLOSE
      </button>
      <button
        mat-raised-button
        color="warn"
        [mat-dialog-close]="blob"
        cdkFocusInitial>
        UPLOAD
      </button>
    </div>`,
  styleUrls: [],
})
export class ImageCropperDialog {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  blob?: Blob | null;
  constructor(
    public dialogRef: MatDialogRef<ImageCropperDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      event: File;
      ratio: number;
    }
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage = URL.createObjectURL(event.blob);
      this.blob = event.blob;
    }
    return;
    // event.blob can be used to upload the cropped image
  }
}
