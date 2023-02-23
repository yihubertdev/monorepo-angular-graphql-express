import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { IUserAuth } from "src/app/core/models/users.type";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { ProfileStorageService } from "src/app/core/services/fireStorage/profile.bucket";
import { UserService } from "src/app/core/services/fireStore/users.firestore";

@Component({
  selector: "user-profile-controller",
  template: ` <mat-card>
    <div class="container">
      <div class="row justify-content-center">
        <div class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div
            mat-card-avatar
            class="user-profile-avatar"
            [ngStyle]="{ 'background-image': 'url(' + photoUrl + ')', margin: 'auto' }"
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
        <div class="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <p>
            <ng-container *ngIf="currentUser?.isAnonymous === false"> Email: {{ currentUser?.email }}</ng-container>
            <ng-container *ngIf="currentUser?.isAnonymous === true"> Email: Anonymous </ng-container>
          </p>
          <p>
            <ng-container *ngIf="currentUser?.isAnonymous === false">
              Name: {{ currentUser?.displayName }}</ng-container
            >
            <ng-container *ngIf="currentUser?.isAnonymous === true"> Name: Anonymous</ng-container>
          </p>
          <p>
            <ng-container *ngIf="currentUser?.isAnonymous === false"> Role: Writer</ng-container>
            <ng-container *ngIf="currentUser?.isAnonymous === true"> Name: Anonymous</ng-container>
          </p>
        </div>
      </div>
    </div>
  </mat-card>`,
  styleUrls: ["../user-profile.style.css"],
})
export class UserProfileControllerComponent implements OnInit, OnChanges {
  @Input() userId?: string;
  @ViewChild("uploadProfile") uploadProfile!: ElementRef;
  currentUser?: IUserAuth;
  photoUrl?: string = "https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private profileStorage: ProfileStorageService,
  ) {}

  ngOnInit() {
    if (!this.userId) {
      this.currentUser = this.authService.get()?.toJSON() as IUserAuth | undefined;
      this.photoUrl = this.currentUser?.photoURL ?? "https://material.angular.io/assets/img/examples/shiba1.jpg";
    }
  }

  async ngOnChanges() {
    if (this.userId) {
      const user = await this.userService.retrieveById(this.userId);

      this.currentUser = {
        uid: this.userId,
        photoURL: user.photoURL,
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

    const url = await this.profileStorage.upload(file[0], this.currentUser?.uid);
    this.photoUrl = url;
  }

  triggerUpload() {
    this.uploadProfile.nativeElement.click();
  }
}
