import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "../../core/joiSchema/blog-edit.schema";
import {
  IFormInput,
  SNACKBAR_ERROR,
  SNACKBAR_ACTION,
  LINK_PREVIEW,
  ILinkPreview,
} from "sources-types";
import { AuthService } from "../../core/services/fireAuth/auth";
import { PostFireStore as PostService } from "../../core/services/fireStore/blog.firestore";
import { postEditFormList } from "../../core/static/post.static";
import { IPost } from "sources-types";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormInputListModule } from "../../shared/components/formInputList/form-input-list.module";

@Component({
  standalone: true,
  imports: [CommonModule, FormInputListModule, HttpClientModule],
  selector: "edit-post-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="blogEditSchema"
    buttonName="Add Blog"
    (formValue)="save($event)"
    [loading]="loading"></form-input-list-component>`,
  styleUrls: ["./edit.style.css"],
})
export class EditPostController {
  formInputList: IFormInput[] = postEditFormList;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  private _tranformURL(value: string) {
    return value.replace(this._urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }
  constructor(
    private _router: Router,
    private _postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  async save(formValue: Record<string, number | string | string[]>) {
    // Get current login user
    const currentUser = this.authService.get();
    if (!currentUser) {
      this._snackBar.open(
        SNACKBAR_ERROR.ADD_ARTICLE_ERROR,
        SNACKBAR_ACTION.POP_UP_ACTION,
        {
          duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
          horizontalPosition: "center",
          verticalPosition: "top",
        }
      );
      this.loading = false;
      return;
    }
    const { userId, displayName, photoURL } = currentUser;
    this.loading = true;

    try {
      const content = this._tranformURL(formValue["content"] as string);
      const links = content.match(this._urlRegex);
      let preview: ILinkPreview | null = null; // firestore only accept null value.

      if (links) {
        preview = (await firstValueFrom(
          this.http.get(
            LINK_PREVIEW.LINK_PREVIEW_NET_URL +
              LINK_PREVIEW.LINK_PREVIEW_NET_KEY +
              `&q=${links[0]}`
          )
        )) as ILinkPreview;
      }

      const newBlog = {
        ...formValue,
        content,
        preview,
        userId,
        displayName,
        photoURL,
      } as unknown as IPost;

      await this._postService.create(newBlog);
      this._router.navigate(["home", "posts"]);
    } catch (err) {
      this._snackBar.open(
        SNACKBAR_ERROR.ADD_ARTICLE_ERROR,
        SNACKBAR_ACTION.POP_UP_ACTION,
        {
          duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
          horizontalPosition: "center",
          verticalPosition: "top",
        }
      );
      this.loading = false;
      return;
    }
  }
}
