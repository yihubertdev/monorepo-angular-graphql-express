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
    <mat-card style="height: 100%;">
      <div class="container vertical-horizontal-center">
        <div class="row justify-content-center">
          <div
            class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div
              mat-card-avatar
              class="user-profile-avatar"
              [ngStyle]="{
                'background-image': 'url(' + photoUrl + ')',
                margin: 'auto'
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
          </div>
        </div>
        <div class="row justify-content-center">
          <div
            class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <p>
              <ng-container>
                {{
                  currentUser?.email
                    | StringTransformPipe : "Email" : currentUser?.isAnonymous
                }}</ng-container
              >
            </p>
            <p>
              <ng-container>
                {{
                  currentUser?.displayName
                    | StringTransformPipe : "Name" : currentUser?.isAnonymous
                }}</ng-container
              >
            </p>
            <p>
              <ng-container>
                {{
                  currentUser?.displayName
                    | StringTransformPipe : "Role" : currentUser?.isAnonymous
                }}</ng-container
              >
            </p>
          </div>
        </div>
      </div>
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

      // this.userService.createSubCollection({
      //   documentId: "241c489e-4f31-41a0-beeb-289a7f771c9a",
      //   collectionId: "firstCollection",
      //   next: {
      //     documentId: "testid",
      //     collectionId: "secondCollection",
      //     next: {
      //       documentId: "test2",
      //       documentValue: { random: "random" } as any,
      //     },
      //   },
      // });
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
