import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "src/app/core/joiSchema/blog-edit.schema";
import { IFormInput, SNACKBAR_ERROR, SNACKBAR_ACTION } from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { PostFireStore as PostService } from "src/app/core/services/fireStore/blog.firestore";
import { postEditFormList } from "src/app/core/static/post.static";
import { IPost } from "sources-types";

@Component({
  selector: "edit-po-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="blogEditSchema"
    buttonName="Add Blog"
    (formValue)="save($event)"
    [loading]="loading"></form-input-list-component>`,
  styleUrls: ["../edit.style.css"],
})
export class EditPostController implements OnInit {
  formInputList: IFormInput[] = postEditFormList;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  constructor(
    private _router: Router,
    private _postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const i = 1;
  }

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
    const newBlog = {
      ...formValue,
      userId,
      displayName,
      photoURL,
    } as unknown as IPost;

    try {
      await this._postService.create(newBlog);
      this._router.navigate(["home", "posts"]);
      this.loading = false;
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
