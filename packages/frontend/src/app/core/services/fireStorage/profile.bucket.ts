import { Injectable } from "@angular/core";
import {
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from "@angular/fire/storage";
import { AuthService } from "../fireAuth/auth";
import { UserService } from "../fireStore/users.firestore";
import { FireStorageBaseModel } from "./basic.bucket";

@Injectable({ providedIn: "root" })
export class ProfileStorageService extends FireStorageBaseModel {
  /**
   * Profile image path
   *
   * @protected
   */
  protected path: string = "profiles";

  /**
   * Profile image category
   *
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
   *
   * @public
   * @param {File} file upload file
   * @param {string} id upload id
   * @returns {Promise<string>} upload url
   */
  public override upload = async (file: File, id: string): Promise<string> => {
    // Upload file extension
    const extension = file.name.split(".").pop();

    // Create fire storage ref
    const storageRef = ref(
      this.storage,
      this.path + "/" + this.category + "-" + id + "." + extension
    );

    // Upload file
    const task = uploadBytesResumable(storageRef, file);

    // Add observer to upload percentage
    this.uploadPercent$ = percentage(task);
    await task;

    // Get the file url
    const url = await getDownloadURL(storageRef);

    // Save user profile on firebase auth
    const user = this.authService.getAuth();

    // If user is not sign in, throw error
    if (!user) {
      throw Error("User is not signed in");
    }

    // Update fire auth user information
    await this.authService.updateUserInfo(user, {
      photoURL: url,
    });

    // Get user profile in firestore
    await this.userService.retrieveById(id);

    // Update user profile in firestore
    this.userService.update({ photoURL: url, id });

    return url;
  };
}
