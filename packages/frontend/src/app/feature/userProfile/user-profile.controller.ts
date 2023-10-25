import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IUser } from "sources-types";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { UserPhotoPipe } from "src/app/shared/pipes/default-photo.pipe";
import { StringTransformPipe } from "src/app/shared/pipes/string-tranform.pipe";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";

@Component({
  standalone: true,
  selector: "user-profile-controller",
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    StringTransformPipe,
    UserPhotoPipe,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    GridListResponsiveDirectiveModule,
    FormInputListComponent,
  ],
  providers: [ProfileStorageService],
  template: `
    <!-- upload image input -->
    <input
      *ngIf="isSettingsPage"
      type="file"
      (change)="uploadImage($event.target)"
      style="display:none"
      id="uploadProfile"
      #uploadProfile
      name="filedata" />
    <mat-card
      class="card-height-responsive"
      style="border-radius: initial;">
      <div
        class="profile-background profile-background-size slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: currentUser?.photoURL ? 'url(' + currentUser?.photoURL + ')' : 'url(' + photoUrl + ')',
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
          class="user-avatar-size user-avatar"
          [ngStyle]="{
            backgroundImage:
              'url(' +
              (currentUser?.photoURL ?? undefined | defaultUserPhoto) +
              ')',
            backgroundSize: 'cover'
          }"></div>
        <div class="position-absolute-bottom-right">
          <a
            mat-raised-button
            color="primary"
            [routerLink]="[currentUser?.userId ?? 'me', 'personal-profile']"
            style="float: right; margin-right: 1%;">
            Profile
            <mat-icon>account_box</mat-icon>
          </a>
        </div>
      </div>
    </mat-card>

    <mat-card
      style="border-radius: initial;"
      *ngIf="!isSettingsPage">
      <mat-card-header>
        <mat-card-title style="display: inline !important;"
          >{{ currentUser?.displayName ?? "Guest" }}
        </mat-card-title>
        <mat-card-subtitle style="display: inline !important;"
          >@{{ currentUser?.userId ?? "guest" }}</mat-card-subtitle
        >
      </mat-card-header>

      <mat-card-content>description blablabla</mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileController implements OnInit {
  @Input() userId?: string;
  @Input() isSettingsPage?: boolean;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;
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
    if (this.isSettingsPage) {
      this.uploadProfile.nativeElement.click();
    }
  }
}
