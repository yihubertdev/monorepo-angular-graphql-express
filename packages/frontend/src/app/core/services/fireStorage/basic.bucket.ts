import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Storage,
  ref,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
  UploadTaskSnapshot,
  StorageReference,
  deleteObject,
} from "@angular/fire/storage";

export interface IUploadFile {
  id: string;
  file: File;
}

export interface IUploadMultipleFileRes {
  file: File;
  storageRef: StorageReference;
  uploadPercent: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }>;
}

@Injectable()
export abstract class FireStorageBaseModel {
  /**
   * uploadPercent
   *
   * @protected
   */
  public uploadPercent$: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }> | null = null;

  /**
   * File saved path
   *
   * @protected
   */
  protected abstract path: string;

  /**
   * File saved category
   *
   * @protected
   */
  protected abstract category: string;

  /**
   * File saved storageRef
   *
   * @protected
   */
  protected storageRef?: StorageReference;

  /**
   * Constructor
   *
   * @param {Storage}storage storage
   */
  constructor(protected storage: Storage) {}

  /**
   * Upload file into fire storage bucket
   *
   * @public
   * @param {File} file upload file
   * @param {string} id upload file id
   * @returns {Promise<string>} return upload file url
   */
  public upload = async (file: File, id: string): Promise<string> => {
    const extension = file.name.split(".").pop();
    const storageRef = ref(
      this.storage,
      this.path + "/" + this.category + "-" + id + "." + extension
    );

    const task = uploadBytesResumable(storageRef, file);
    this.uploadPercent$ = percentage(task);
    await task;

    const url = await getDownloadURL(storageRef);

    return url;
  };

  /**
   * Upload file into fire storage bucket
   *
   * @public
   * @param {File} file upload file
   * @param {string} id upload file id
   * @param {string} path upload file path
   * @param {string} category upload file category
   * @returns {Promise<string>} return upload task
   */
  public uploadWithPath = async (
    file: File,
    id: string,
    path: string,
    category: string
  ): Promise<UploadTaskSnapshot> => {
    // Upload file extension
    const extension = file.name.split(".").pop();

    // Create fire storage ref
    this.storageRef = ref(
      this.storage,
      path + "/" + category + "-" + id + "." + extension
    );

    // Upload file
    const task = uploadBytesResumable(this.storageRef, file);

    // Add observer to upload percentage
    this.uploadPercent$ = percentage(task);
    return task;
  };

  /**
   * Upload multiple file with storageRef
   *
   * @public
   * @param {IUploadFile[]} uploadFiles upload file
   * @param {string} path upload file path
   * @param {string} category upload file category
   * @returns {IUploadMultipleFileRes} return upload task
   */
  public uploadMultiple = (
    uploadFiles: IUploadFile[],
    path: string = this.path,
    category: string = this.category
  ): IUploadMultipleFileRes[] => {
    return uploadFiles.map((uploadFile) => {
      // Upload file extension
      const extension = uploadFile.file.name.split(".").pop();

      // Create fire storage ref
      const storageRef = ref(
        this.storage,
        path + "/" + category + "-" + uploadFile.id + "." + extension
      );

      const task = uploadBytesResumable(storageRef, uploadFile.file);

      return {
        storageRef: storageRef,
        file: uploadFile.file,
        uploadPercent: percentage(task),
      };
    });

    // const uploadTask = this.formFileStorage.uploadWithPath(
    //   file[0],
    //   uuidv4(),
    //   this.documentPath,
    //   this.documentCategory
    // );

    // this.formFileStorage.uploadPercent$?.subscribe((data) => {
    //   this.uploadPercentage = data.progress;
    // });

    // await uploadTask;
    // const fileUrl = await this.formFileStorage.getDownloadURL();
    // if (fileUrl) {
    //   this.documentUpload.emit(fileUrl);
    // }
  };

  /**
   * Get Multiple File Download URl
   *
   * @public
   * @param {StorageReference[]} storageRefs upload file
   * @returns {string[]} return upload task
   */
  public getMultipleURL = (storageRefs: StorageReference): Promise<string> => {
    return getDownloadURL(storageRefs);
  };

  /**
   * Get Download URl
   *
   * @public
   * @param {StorageReference} storageRef upload file
   * @returns {string[]} return upload task
   */
  public getDownloadURL = (
    storageRef: StorageReference | undefined = this.storageRef
  ): Promise<string> | null => {
    return storageRef ? getDownloadURL(storageRef) : null;
  };

  /**
   * Delete file
   *
   * @public
   */
  public deleteFile = async (): Promise<void> => {
    if (!this.storageRef) return;
    await deleteObject(this.storageRef);
  };

  /**
   * Delete file by url
   *
   * @param {string}url delete file by url
   * @public
   */
  public deleteFileByUrl = async (url: string): Promise<void> => {
    if (!this.storageRef) return;
    await deleteObject(this.storageRef);
  };
}
