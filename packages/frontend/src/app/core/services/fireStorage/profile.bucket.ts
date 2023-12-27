import { Injectable } from "@angular/core";
import { Storage } from "@angular/fire/storage";
import { AuthService } from "../fireAuth/auth";
import { UserService } from "../fireStore/users.firestore";
import { FireStorageBaseModel } from "./basic.bucket";

@Injectable({ providedIn: "root" })
export class ProfileStorageService extends FireStorageBaseModel {
  /**
   * Profile image path
   * @protected
   */
  protected path: string = "profiles";

  /**
   * Profile image category
   * @protected
   */
  protected category: string = "profile";

  constructor(
    storage: Storage,
    private userService: UserService,
    private authService: AuthService
  ) {
    super(storage);
  }

  /**
   * Upload file into fire storage bucket
   * @public
   * @param {File} file upload file
   * @param {string} userId upload id
   * @returns {Promise<string>} upload url
   */
  public override async upload(file: File, userId: string): Promise<string> {
    const url = await super.upload(file, userId);

    // Update fire auth user information
    this.authService.updateUserInfo({
      photoURL: url,
    });

    // Get user profile in firestore
    await this.userService.retrieveById([userId]);

    // Update user profile in firestore
    await this.userService.updateByUserId({
      document: { photoURL: url },
      userId,
    });

    return url;
  }

  /**
   * Upload file into fire storage bucket
   * @public
   * @param {Blob} blob upload file
   * @returns {Promise<string>} upload url
   */
  public override async uploadBlob(blob: Blob): Promise<string> {
    const url = await super.uploadBlob(blob);

    // Update fire auth user information
    this.authService.updateUserInfo({
      photoURL: url,
    });

    return url;
  }

  public async uploadBackgroundImage(
    blob: Blob,
    userId: string
  ): Promise<string> {
    const backgroundPhotoURL = await super.uploadBlob(blob);

    // Update user profile in firestore
    await this.userService.updateByUserId({
      document: { backgroundPhotoURL },
      userId,
    });

    return backgroundPhotoURL;
  }
}
