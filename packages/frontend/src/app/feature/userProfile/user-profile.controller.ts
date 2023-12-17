import { NgIf, NgStyle } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IUser } from "sources-types";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { UserPhotoPipe } from "src/app/shared/pipes/default-photo.pipe";
import { StringTransformPipe } from "src/app/shared/pipes/string-tranform.pipe";
import { ProfileCardComponent } from "../../shared/components/postCard/profile-card.compnent";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ImageCropperDialog } from "./user-profile-settings.controller";

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
    <input
      *ngIf="isSettingsPage"
      type="file"
      (change)="uploadImage($event.target)"
      style="display:none"
      #uploadBackgroundImage
      name="filedata" />
    <mat-card
      class="card-height-responsive"
      style="border-radius: initial;">
      <div
        class="profile-background profile-background-size slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: currentUser?.backgroundPhotoURL ? 'url(' + currentUser?.backgroundPhotoURL + ')' : 'url(' + photoUrl + ')',
        }">
        <mat-icon
          *ngIf="isSettingsPage"
          class="user-avatar-uploader-corner cursor-pointer"
          (click)="triggerUpload()"
          >upload</mat-icon
        >
      </div>

      <div
        class="position-absolute-bottom m-0 p-0"
        style="width: 100%;"
        *ngIf="!isSettingsPage">
        <div
          class="user-avatar-size user-avatar-square"
          [ngStyle]="{
            backgroundImage:
              'url(' + (currentUser?.photoURL ?? null | defaultUserPhoto) + ')',
            backgroundSize: 'cover'
          }"></div>
        <!-- <div class="position-absolute-bottom-right">
          <a
            mat-raised-button
            color="primary"
            [routerLink]="[currentUser?.userId ?? 'me', 'personal-profile']"
            style="float: right; margin-right: 1%;">
            Profile
            <mat-icon>account_box</mat-icon>
          </a>
        </div> -->
      </div>
    </mat-card>
    <ng-template #profile>
      <profile-card-component
        [currentUser]="currentUser"></profile-card-component>
    </ng-template>
    <ng-container *ngIf="isSettingsPage; else profile"></ng-container>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileController implements OnInit {
  @Input() userId?: string;
  @Input() isSettingsPage?: boolean;
  @ViewChild("uploadBackgroundImage") uploadBackgroundImage!: ElementRef;
  currentUser?: IUser;
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
      await this.profileStorage.uploadBackgroundImage(
        data,
        this.currentUser!.userId
      );
      throw new Error("Background Image uploaded");
    });
  }
  triggerUpload() {
    if (this.isSettingsPage) {
      this.uploadBackgroundImage.nativeElement.click();
    }
  }
}
