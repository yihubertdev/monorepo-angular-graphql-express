import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IUserAuth } from "src/app/core/models/users.type";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { UserService } from "src/app/core/services/fireStore/users.firestore";

@Component({
  selector: "user-profile-controller",
  template: `
    <mat-card style="height: 30dvh; border-radius: initial;">
      <div
        class="profile-background profile-background-size slide-image-cover-center"
        [ngStyle]="{
          backgroundImage: 'url(' + photoUrl + ')',
        }"></div>
      <div
        class="user-avatar-size m-0 p-0 user-avatar"
        [ngStyle]="{
          backgroundImage:
            'url(' + (currentUser?.photoURL | UserPhotoPipe) + ')',
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
      <div class="position-absolute-vertical-bottom-horizontal-center m-0 p-0">
        <mat-card-title>{{
          currentUser?.displayName ?? "Guest"
        }}</mat-card-title>
        <mat-card-subtitle>@username</mat-card-subtitle>
      </div>
    </mat-card>

    <mat-card style="border-radius: initial;">
      <mat-card-content>description blablabla</mat-card-content>
    </mat-card>
  `,
  styleUrls: ["../user-profile.style.css"],
})
export class UserProfileControllerComponent implements OnInit, OnChanges {
  @Input() userId?: string;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;
  currentUser?: IUserAuth;
  photoUrl: string =
    "https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private profileStorage: ProfileStorageService
  ) {}

  ngOnInit() {
    if (!this.userId) {
      this.currentUser = this.authService.get()?.toJSON() as
        | IUserAuth
        | undefined;

      this.photoUrl = this.currentUser?.photoURL ?? this.photoUrl;
    }
  }

  async ngOnChanges() {
    if (this.userId) {
      const user = await this.userService.retrieveById(this.userId);

      if (!user) {
        this.currentUser = {
          uid: "",
          photoURL: this.photoUrl,
          isAnonymous: true,
          email: "",
          emailVerified: false,
          displayName: "",
        } as IUserAuth;
        return;
      }

      this.currentUser = {
        uid: this.userId,
        photoURL: user.photoURL ?? this.photoUrl,
        isAnonymous: user.isAnonymous,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.username ?? "",
      } as IUserAuth;
    }
  }

  async uploadImage(eventTarget: EventTarget | null) {
    const element = eventTarget as HTMLInputElement | null;
    const file = element?.files;
    if (!file || !this.currentUser) return;

    const url = await this.profileStorage.upload(
      file[0],
      this.currentUser?.uid
    );
    this.photoUrl = url;
  }

  triggerUpload() {
    this.uploadProfile.nativeElement.click();
  }
}
