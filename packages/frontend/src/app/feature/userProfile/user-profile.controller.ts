import { NgIf, NgStyle } from "@angular/common";
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
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IUser } from "type-sources";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { UserPhotoPipe } from "src/app/shared/pipes/default-photo.pipe";
import { StringTransformPipe } from "src/app/shared/pipes/string-tranform.pipe";
import { ProfileCardComponent } from "../../shared/components/postCard/profile-card.compnent";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { SuccessMessage } from "src/app/core/utils/error";
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";

@Component({
  standalone: true,
  selector: "user-profile-controller",
  imports: [
    NgIf,
    NgStyle,
    MatCardModule,
    MatGridListModule,
    StringTransformPipe,
    UserPhotoPipe,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    FormInputListComponent,
    ProfileCardComponent,
    MatDialogModule,
  ],
  providers: [ProfileStorageService],
  template: `
    <!-- upload image input -->
    <mat-card
      class="card-height-responsive"
      style="border-radius: initial;">
      <div
        class="profile-background profile-background-size slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: currentUser.backgroundPhotoURL
            ? 'url(' + currentUser.backgroundPhotoURL + ')'
            : 'url(' + photoUrl + ')'
        }">
        @if (isSettingsPage) {
          <input
            type="file"
            (change)="uploadImage($event.target)"
            style="display:none"
            #uploadBackgroundImage />
          <mat-icon
            class="user-avatar-uploader-corner cursor-pointer"
            (click)="uploadBackgroundImage.click()"
            >upload</mat-icon
          >
        }
      </div>

      <div class="position-absolute-bottom">
        <div
          class="user-avatar-size user-avatar-square"
          [ngStyle]="{
            backgroundImage:
              'url(' + (currentUser.photoURL ?? null | defaultUserPhoto) + ')',
            backgroundSize: 'cover'
          }">
          @if (isSettingsPage) {
            <input
              type="file"
              (change)="uploadProfile($event.target)"
              style="display:none"
              #profileUploader />
            <mat-icon
              class="user-avatar-uploader-center cursor-pointer"
              (click)="profileUploader.click()"
              >upload</mat-icon
            >
          }
        </div>
      </div>
    </mat-card>

    <profile-card-component
      [currentUser]="currentUser"></profile-card-component>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileController implements OnInit {
  @Input() userId?: string;
  @Input() isSettingsPage?: boolean;
  @ViewChild("uploadBackgroundImage") uploadBackgroundImage!: ElementRef;
  @ViewChild("profileUploader") profileUploader!: ElementRef;
  currentUser!: IUser;
  photoUrl: string =
    "https://material.angular.io/assets/img/examples/shiba1.jpg";

  public isShowMore: boolean = false;
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
        ratio: 4 / 1,
      },
    });
    this.uploadBackgroundImage.nativeElement.value = "";
    dialogRef.afterClosed().subscribe(async (data: Blob) => {
      if (!data) return;
      const backgroundImage = await this.profileStorage.uploadBackgroundImage(
        data,
        this.currentUser!.userId
      );
      this.currentUser.backgroundPhotoURL = backgroundImage;
      throw new SuccessMessage("Background Image uploaded");
    });
  }

  async uploadProfile(eventTarget: EventTarget | null) {
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
    this.profileUploader.nativeElement.value = "";
    dialogRef.afterClosed().subscribe(async (data: Blob) => {
      if (!data) return;
      const photoURL = await this.profileStorage.uploadBlob(data);
      this.currentUser.photoURL = photoURL;
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
        <div class="col-6">
          <img
            [src]="croppedImage"
            height="100"
            [width]="100 * data.ratio" />
        </div>
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
