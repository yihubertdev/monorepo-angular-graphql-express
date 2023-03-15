import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormFileStorageService } from "src/app/core/services/fireStorage/form-file.bucket";
import { quillEditorModule } from "src/app/core/static/post.static";
import { v4 as uuidv4 } from "uuid";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
import { UploadVideoDialog } from "../../dialog/uploadVideo/upload-video.dialog";
import { EMBED_YOUTUBE_URL } from "src/app/core/models/constants";

@Component({
  selector: "editor-component",
  template: ` <ng-container>
    <input
      type="file"
      (change)="uploadImage($event.target)"
      style="display:none"
      id="uploadImageRef"
      #uploadImageRef
      name="uploadImage" />

    <quill-editor
      (onEditorCreated)="getEditorInstance($event)"
      [(ngModel)]="editorContent"
      name="quillEditor"
      id="quillEditor"
      [modules]="quillEditorModule"
      trackChanges="all"
      [styles]="{ height: '65dvh' }"
      placeholder=""></quill-editor>
    <mat-progress-bar
      mode="determinate"
      [value]="uploadPercentage"></mat-progress-bar>
  </ng-container>`,
  styleUrls: [],
})
export class EditorComponent {
  @ViewChild("uploadImageRef") uploadImageRef!: ElementRef;
  @Input() editorContent: string = "";
  @Output() editorContentChange = new EventEmitter<string>();

  public quillEditorModule = quillEditorModule;
  public uploadPercentage: number = 0;
  public editorRef: any;
  public videoId: string = "";

  constructor(
    private formFileStorage: FormFileStorageService,
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  getEditorInstance(editorInstance: any) {
    this.editorRef = editorInstance;
    let toolbar = editorInstance.getModule("toolbar");
    toolbar.addHandler("image", () => {
      this.uploadImageRef.nativeElement.click();
    });
    toolbar.addHandler("video", () => {
      this.uploadVideo();
    });
  }

  exportEditorContent() {
    this.editorContentChange.emit(this.editorContent);
  }

  async uploadImage(eventTarget: EventTarget | null): Promise<void> {
    this.uploadPercentage = 0;
    // Transform eventTarget to HTMLInputElement
    const element = eventTarget as HTMLInputElement | null;

    // Get the upload file
    const file = element?.files;

    if (!file) return;

    const uploadTask = this.formFileStorage.uploadWithPath(
      file[0],
      uuidv4(),
      "article",
      "image"
    );

    this.formFileStorage.uploadPercent$?.subscribe((data) => {
      this.uploadPercentage = data.progress;
    });

    await uploadTask;
    const fileUrl = await this.formFileStorage.getDownloadURL();
    if (fileUrl) {
      const img = `<img style="width: 80%" src='${fileUrl}'></img>`;

      const range = this.editorRef.getSelection();

      this.editorRef.clipboard.dangerouslyPasteHTML(range.index, img);
    }
  }

  async uploadVideo() {
    const dialogRef = this.dialog.open(UploadVideoDialog, {
      disableClose: true,
      data: { id: this.videoId },
    });

    dialogRef.afterClosed().subscribe((id) => {
      const range = this.editorRef.getSelection();

      this.editorRef.insertEmbed(
        range.index,
        "video",
        `${EMBED_YOUTUBE_URL}${id}`
      );
      this.editorRef.setSelection(range.index + 1);
    });
  }
}
