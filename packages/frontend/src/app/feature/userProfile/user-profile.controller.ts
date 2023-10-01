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
import { RouterModule } from "@angular/router";
import { IUser } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { UserPhotoPipe } from "src/app/shared/pipes/default-photo.pipe";
import { StringTransformPipe } from "src/app/shared/pipes/string-tranform.pipe";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    FormInputListModule,
  ],
  template: `
    <mat-card style="height: 30dvh; border-radius: initial;">
      <div
        class="profile-background profile-background-size slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: currentUser?.photoURL ? 'url(' + currentUser?.photoURL + ')' : 'url(' + photoUrl + ')',
        }"></div>

      <div
        class="position-absolute-bottom m-0 p-0"
        style="width: 100%;">
        <div
          class="user-avatar-size m-0 p-0 user-avatar"
          [ngStyle]="{
            backgroundImage:
              'url(' +
              (currentUser?.photoURL ?? undefined | defaultUserPhoto) +
              ')',
            backgroundSize: 'cover'
          }"
          (click)="triggerUpload()">
          <input
            type="file"
            (change)="uploadImage($event.target)"
            style="display:none"
            id="uploadProfile"
            #uploadProfile
            name="filedata" />
        </div>
        <div class="position-absolute-bottom-right">
          <a
            mat-raised-button
            color="primary"
            style="float: right; ">
            Follow
            <mat-icon>person</mat-icon>
          </a>
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

    <mat-card style="border-radius: initial;">
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
export class UserProfileController implements OnChanges {
  @Input() userId?: string;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;
  currentUser: IUser | null = null;
  photoUrl: string =
    "https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(
    private _authService: AuthService,
    private userService: UserService,
    private profileStorage: ProfileStorageService,
    private _ref: ChangeDetectorRef
  ) {}

  async ngOnChanges() {
    if (!this.userId) {
      this._authService.userAuthObserver$.subscribe(() => {
        this.currentUser = this._authService.get();
        this._ref.detach();
        this._ref.detectChanges();
      });
    } else {
      [this.currentUser] = await this.userService.retrieve({
        userId: this.userId,
      });
    }
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
