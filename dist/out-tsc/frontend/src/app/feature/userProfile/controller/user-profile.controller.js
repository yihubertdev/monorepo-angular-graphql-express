"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let UserProfileControllerComponent = class UserProfileControllerComponent {
    constructor(authService, userService, profileStorage) {
        this.authService = authService;
        this.userService = userService;
        this.profileStorage = profileStorage;
        this.photoUrl = "https://material.angular.io/assets/img/examples/shiba1.jpg";
    }
    ngOnInit() {
        if (!this.userId) {
            this.currentUser = this.authService.get()?.toJSON();
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
                };
                return;
            }
            this.currentUser = {
                uid: this.userId,
                photoURL: user.photoURL ?? this.photoUrl,
                isAnonymous: user.isAnonymous,
                email: user.email,
                emailVerified: user.emailVerified,
                displayName: user.username ?? "",
            };
        }
    }
    async uploadImage(eventTarget) {
        const element = eventTarget;
        const file = element?.files;
        if (!file || !this.currentUser)
            return;
        const url = await this.profileStorage.upload(file[0], this.currentUser?.uid);
        this.photoUrl = url;
    }
    triggerUpload() {
        this.uploadProfile.nativeElement.click();
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], UserProfileControllerComponent.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)("uploadProfile")
], UserProfileControllerComponent.prototype, "uploadProfile", void 0);
UserProfileControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
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
], UserProfileControllerComponent);
exports.UserProfileControllerComponent = UserProfileControllerComponent;
//# sourceMappingURL=user-profile.controller.js.map